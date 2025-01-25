document.addEventListener('DOMContentLoaded', function() {
  // FilePond initialization
  $.fn.filepond.registerPlugin(FilePondPluginImagePreview);

  const pond = FilePond.create(document.getElementById('filepond'), {
      allowMultiple: true,
      maxFiles: 5,
      acceptedFileTypes: ['image/*'],
      labelFileTypeNotAllowed: 'Invalid file type',
      fileValidateTypeLabelExpectedTypes: 'Expects {allTypes}',
      instantUpload: false,
      imagePreviewHeight: 370,
      imageCropAspectRatio: '1:1',
      imageResizeTargetWidth: 200,
      imageResizeTargetHeight: 200,
      stylePanelLayout: 'compact',
      styleLoadIndicatorPosition: 'center bottom',
      styleProgressIndicatorPosition: 'right bottom',
      styleButtonRemoveItemPosition: 'left bottom',
      styleButtonProcessItemPosition: 'right bottom',
  });

  const processBtn = document.getElementById('processBtn');
  const resultContainer = document.getElementById('resultContainer');
  const resultText = document.getElementById('resultText');
  const copyBtn = document.getElementById('copyBtn');

  processBtn.addEventListener('click', function() {
      const files = pond.getFiles();
      if (files.length === 0) {
          alert('Please upload at least one image');
          return;
      }

      const formData = new FormData();
      files.forEach((file, index) => {
          formData.append('files[]', file.file);
      });

      formData.append('language', document.getElementById('languageSelect').value);
      formData.append('format', document.getElementById('formatSelect').value);

      fetch('process.php', {
          method: 'POST',
          body: formData
      })
      .then(response => response.json())
      .then(data => {
          resultText.textContent = data.text || 'No text extracted';
          resultContainer.style.display = 'block';
      })
      .catch(error => {
          console.error('Error:', error);
          alert('Processing failed');
      });
  });

  copyBtn.addEventListener('click', function() {
      navigator.clipboard.writeText(resultText.textContent)
          .then(() => alert('Text copied!'))
          .catch(err => console.error('Copy failed:', err));
  });
});