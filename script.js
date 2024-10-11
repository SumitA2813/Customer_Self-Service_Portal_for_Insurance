

document.addEventListener('DOMContentLoaded', () => {
    
    const fileClaimBtn = document.getElementById('fileClaimBtn');
    const trackClaimBtn = document.getElementById('trackClaimBtn');
    const chatbotBtn = document.getElementById('chatbotBtn');
    const knowledgeBaseBtn = document.getElementById('knowledgeBaseBtn');

   
    const claimSubmission = document.getElementById('claimSubmission');
    const chatbotSection = document.getElementById('chatbotSection');
    const knowledgeBase = document.getElementById('knowledgeBase');
    const recentClaims = document.getElementById('recentClaims');

   
    fileClaimBtn.addEventListener('click', () => {
        showSection(claimSubmission);
    });

    trackClaimBtn.addEventListener('click', () => {
        showSection(recentClaims);
    });

    chatbotBtn.addEventListener('click', () => {
        showSection(chatbotSection);
    });

    knowledgeBaseBtn.addEventListener('click', () => {
        showSection(knowledgeBase);
    });

    function showSection(section) {
       
        claimSubmission.classList.add('hidden');
        chatbotSection.classList.add('hidden');
        knowledgeBase.classList.add('hidden');
        recentClaims.classList.add('hidden');

        
        section.classList.remove('hidden');
    }

    
    let claims = [
        { claimNumber: 'CLM001', status: 'In Review', dateSubmitted: '09/05/2024' },
        { claimNumber: 'CLM002', status: 'Approved', dateSubmitted: '08/25/2024' },
    ];

    const claimsTableBody = document.getElementById('claimsTableBody');

    function renderClaims() {
        claimsTableBody.innerHTML = '';
        claims.forEach(claim => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${claim.claimNumber}</td>
                <td>${claim.status}</td>
                <td>${claim.dateSubmitted}</td>
            `;
            claimsTableBody.appendChild(row);
        });
    }

    renderClaims();

    
    const claimForm = document.getElementById('claimForm');
    const formMessage = document.getElementById('formMessage');

    claimForm.addEventListener('submit', (e) => {
        e.preventDefault();

        
        const policyNumber = document.getElementById('policyNumber').value.trim();
        const incidentDate = document.getElementById('incidentDate').value;
        const incidentDescription = document.getElementById('incidentDescription').value.trim();

        if (!policyNumber || !incidentDate || !incidentDescription) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        
        const newClaimNumber = `CLM${(claims.length + 1).toString().padStart(3, '0')}`;
        const newClaim = {
            claimNumber: newClaimNumber,
            status: 'Submitted',
            dateSubmitted: new Date().toLocaleDateString(),
        };

        claims.push(newClaim);
        renderClaims();

        
        showMessage('Claim submitted successfully!', 'success');
        claimForm.reset();

        
        setTimeout(() => {
            updateClaimStatus(newClaimNumber, 'In Review');
        }, 5000);
    });

    function showMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = type;
        setTimeout(() => {
            formMessage.textContent = '';
            formMessage.className = '';
        }, 5000);
    }

    function updateClaimStatus(claimNumber, newStatus) {
        const claim = claims.find(c => c.claimNumber === claimNumber);
        if (claim) {
            claim.status = newStatus;
            renderClaims();
        }
    }

    
    setInterval(() => {
        claims.forEach(claim => {
            if (claim.status === 'Submitted') {
                updateClaimStatus(claim.claimNumber, 'In Review');
            } else if (claim.status === 'In Review') {
                updateClaimStatus(claim.claimNumber, 'Approved');
            }
        });
    }, 15000); 

    
    const articles = [
        {
            title: 'How to File a Claim',
            content: 'To file a claim, navigate to the "File a Claim" section and fill out the required information. Ensure you have your policy number and any supporting documents ready.'
        },
        {
            title: 'Understanding Your Insurance Policy',
            content: 'Your insurance policy outlines the coverage details, exclusions, and terms and conditions. It is important to read and understand your policy to know what is covered.'
        },
        {
            title: 'Common Questions About Claims',
            content: 'Here are some common questions customers have about the claims process, including how to check claim status and what information is required.'
        },
        {
            title: 'Contacting Customer Support',
            content: 'If you need further assistance, you can contact our customer support team via phone or email. Our representatives are available to help you with any inquiries.'
        },
        
    ];

    const searchBar = document.getElementById('searchBar');
    const searchResults = document.getElementById('searchResults');

    searchBar.addEventListener('input', () => {
        const query = searchBar.value.toLowerCase();
        const filteredArticles = articles.filter(article => 
            article.title.toLowerCase().includes(query) ||
            article.content.toLowerCase().includes(query)
        );

        displayResults(filteredArticles);
    });

    function displayResults(results) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            searchResults.innerHTML = '<p>No articles found.</p>';
            return;
        }

        results.forEach(article => {
            const articleDiv = document.createElement('article');
            articleDiv.innerHTML = `
                <h3>${article.title}</h3>
                <p>${article.content}</p>
            `;
            searchResults.appendChild(articleDiv);
        });
    }
});
