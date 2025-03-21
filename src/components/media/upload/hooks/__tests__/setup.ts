
// Mock the FileReader API
class MockFileReader {
  onload: Function | null = null;
  onerror: Function | null = null;
  result: string | ArrayBuffer | null = null;
  readAsDataURL() {
    setTimeout(() => {
      this.result = 'data:image/jpeg;base64,mockedbase64data';
      if (this.onload) this.onload({ target: this });
    }, 0);
  }
  readAsText() {
    setTimeout(() => {
      this.result = 'mocked text content';
      if (this.onload) this.onload({ target: this });
    }, 0);
  }
  readAsBinaryString() {
    setTimeout(() => {
      this.result = 'mocked binary content';
      if (this.onload) this.onload({ target: this });
    }, 0);
  }
}

// Mock for URL.createObjectURL
if (typeof global.URL.createObjectURL === 'undefined') {
  global.URL.createObjectURL = function() { return 'mocked-url'; };
}

if (typeof global.URL.revokeObjectURL === 'undefined') {
  global.URL.revokeObjectURL = function() {};
}

// Set up FileReader mock
global.FileReader = MockFileReader as any;

export {};
