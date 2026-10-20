"""Check the deployable static site using only Python's standard library."""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
from urllib.request import urlopen
from html.parser import HTMLParser
import unittest

ROOT = Path(__file__).resolve().parents[1]

class Document(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids = set()
        self.local_resources = set()
        self.anchors = []
    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if 'id' in attrs:
            self.ids.add(attrs['id'])
        for key in ('src', 'href'):
            value = attrs.get(key, '')
            if value.startswith('#'):
                self.anchors.append(value[1:])
            elif value and not value.startswith(('https:', 'http:', 'mailto:', 'data:')):
                self.local_resources.add(value)

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

class SiteSmokeTest(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
        cls.thread = Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base = f'http://127.0.0.1:{cls.server.server_port}'
    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()
    def test_page_and_internal_anchors(self):
        with urlopen(self.base + '/') as response:
            self.assertEqual(response.status, 200)
            document = Document()
            document.feed(response.read().decode())
        self.assertTrue({'main', 'about', 'publications', 'projects'} <= document.ids)
        for anchor in document.anchors:
            with self.subTest(anchor=anchor):
                self.assertIn(anchor, document.ids)
    def test_all_html_resources_are_served(self):
        document = Document()
        document.feed((ROOT / 'index.html').read_text())
        self.assertGreaterEqual(len(document.local_resources), 5)
        for resource in document.local_resources:
            with self.subTest(resource=resource), urlopen(self.base + '/' + resource) as response:
                self.assertEqual(response.status, 200)
                self.assertGreater(len(response.read()), 0)
    def test_cv_is_real_pdf(self):
        with urlopen(self.base + '/assets/CV_IkjooOh.pdf') as response:
            self.assertEqual(response.headers.get_content_type(), 'application/pdf')
            self.assertTrue(response.read().startswith(b'%PDF-'))

if __name__ == '__main__':
    unittest.main(verbosity=2)
