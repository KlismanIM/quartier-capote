/**
 * Contact form module
 * Handles form submission via Formspree
 */

export function initForm() {
  const form = document.getElementById('contactForm');
  const successMessage = document.getElementById('formSuccess');
  const submitBtn = document.getElementById('submitBtn');
  const submitText = document.getElementById('submitText');
  const loadingSpinner = document.getElementById('loadingSpinner');

  if (!form) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Show loading state
    if (submitText && loadingSpinner) {
      submitText.classList.add('hidden');
      loadingSpinner.classList.remove('hidden');
    }
    
    const formData = new FormData(form);
    
    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        form.reset();
        if (successMessage) {
          successMessage.classList.remove('hidden');
        }
        
        // Start countdown
        let countdown = 3;
        const countdownElement = document.getElementById('countdown');
        const interval = setInterval(() => {
          countdown--;
          if (countdownElement) {
            countdownElement.textContent = countdown;
          }
          if (countdown <= 0) {
            clearInterval(interval);
            window.location.href = '/';
          }
        }, 1000);
      } else {
        alert('Erro ao enviar. Tente novamente.');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      alert('Erro de conexão. Tente novamente.');
    } finally {
      // Reset button state
      if (submitText && loadingSpinner) {
        submitText.classList.remove('hidden');
        loadingSpinner.classList.add('hidden');
      }
    }
  }

  form.addEventListener('submit', handleSubmit);
  
  // Set replyTo field
  const emailInput = document.getElementById('email');
  const replyToField = document.getElementById('replyTo');
  if (emailInput && replyToField) {
    emailInput.addEventListener('change', () => {
      replyToField.value = emailInput.value;
    });
  }

  return {
    handleSubmit
  };
}

export default initForm;