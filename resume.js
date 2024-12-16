const form = document.getElementById('resume-form');
    const preview = document.getElementById('resume-preview');
    const generateButton = document.getElementById('generate-resume');
    const downloadButton = document.getElementById('download-resume');

    generateButton.addEventListener('click', () => {
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const address = document.getElementById('address').value;
      const skills = document.getElementById('skills').value.split(',');
      const photoInput = document.getElementById('photo');

      if (!name || !email || !phone) {
        alert('Please fill in all required fields.');
        return;
      }

      let photoURL = '';
      if (photoInput.files.length > 0) {
        const reader = new FileReader();
        reader.onload = function (e) {
          photoURL = e.target.result;
          renderResume(name, email, phone, address, skills, photoURL);
        };
        reader.readAsDataURL(photoInput.files[0]);
      } else {
        renderResume(name, email, phone, address, skills, photoURL);
      }
    });

    function renderResume(name, email, phone, address, skills, photoURL) {
      preview.style.display = 'block';
      preview.innerHTML = `
        ${photoURL ? `<img src="${photoURL}" alt="Profile Picture">` : ''}
        <h2>${name}</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}</p>
        <p><strong>Skills:</strong> ${skills.join(', ')}</p>
      `;
    }

    downloadButton.addEventListener('click', () => {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF();
      pdf.html(preview, {
        callback: function (doc) {
          doc.save('resume.pdf');
        },
        x: 10,
        y: 10
      });
    });