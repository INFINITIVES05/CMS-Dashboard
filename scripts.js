document.addEventListener('DOMContentLoaded', function() {
    const logo1Input = document.getElementById('logo1');
    const logo2Input = document.getElementById('logo2');
    const downloadBtn = document.getElementById('download-template-btn');
    const updateBtn = document.querySelector('button[onclick="updateSummary()"]');
    
    // Load and display logos
    logo1Input.addEventListener('change', function() {
        const logo1File = this.files[0];
        const logo1Preview = document.getElementById('logo1-preview');
        if (logo1File) {
            const reader = new FileReader();
            reader.onload = function(e) {
                logo1Preview.src = e.target.result;
            };
            reader.readAsDataURL(logo1File);
        }
    });

    logo2Input.addEventListener('change', function() {
        const logo2File = this.files[0];
        const logo2Preview = document.getElementById('logo2-preview');
        if (logo2File) {
            const reader = new FileReader();
            reader.onload = function(e) {
                logo2Preview.src = e.target.result;
            };
            reader.readAsDataURL(logo2File);
        }
    });

    // Update the summary preview
    function updateSummary() {
    
        // Retrieve values from form
        const matchType = document.getElementById('match-type').value || 'MATCH TYPE';
        const date = document.getElementById('date').value || 'DATE';
        const venue = document.getElementById('venue').value || 'VENUE';
        const team1Name = document.getElementById('team1-name').value || 'Team 1';
        const team2Name = document.getElementById('team2-name').value || 'Team 2';
        const team1Score = document.getElementById('team1-score').value || 'Score';
        const team1Overs = document.getElementById('team1-overs').value || 'Overs';
        const team2Score = document.getElementById('team2-score').value || 'Score';
        const team2Overs = document.getElementById('team2-overs').value || 'Overs';
        const team1Batters = document.getElementById('team1-players-1st').value || '';
        const team2Bowlers = document.getElementById('team2-players-1st').value || '';
        const team2Batters = document.getElementById('team2-players-2nd').value || '';
        const team1Bowlers = document.getElementById('team1-players-2nd').value || '';
        const winningResult = document.getElementById('winning-result').value || 'No result yet';

        // Update preview
        document.getElementById('match-summary-preview').textContent = matchType;
        document.getElementById('match-type-preview').textContent = matchType;
        document.getElementById('date-preview').textContent = date;
        document.getElementById('venue-preview').textContent = venue;
        document.getElementById('team1-namevs').textContent = team1Name;
        document.getElementById('team2-namevs').textContent = team2Name;
        document.getElementById('team1-name-preview').textContent = team1Name;
        document.getElementById('team2-name-preview').textContent = team2Name;
        document.getElementById('team1-score-preview').textContent = team1Score;
        document.getElementById('team1-overs-preview').textContent = team1Overs;
        document.getElementById('team2-score-preview').textContent = team2Score;
        document.getElementById('team2-overs-preview').textContent = team2Overs;
        document.getElementById('team1-batters-preview').innerHTML = formatList(team1Batters);
        document.getElementById('team2-bowlers-preview').innerHTML = formatList(team2Bowlers);
        document.getElementById('team2-batters-preview').innerHTML = formatList(team2Batters);
        document.getElementById('team1-bowlers-preview').innerHTML = formatList(team1Bowlers);
        document.getElementById('winning-result-preview').textContent = winningResult;

        // Apply color changes
        const headerBgColor = document.getElementById('header-bg-color').value || '##1b2a49';
        const headerTextColor = document.getElementById('header-text-color').value || '#ffffff';
        const team1BgColor = document.getElementById('team1-bg-color').value || '#b12034';
        const team2BgColor = document.getElementById('team2-bg-color').value || '#b12034';
        const team1TextColor = document.getElementById('team1txt-bg-color').value || '#ffffff';
        const team2TextColor = document.getElementById('team2txt-bg-color').value || '#ffffff';

        document.querySelector('.match-summary').style.backgroundColor = headerBgColor;
        document.querySelector('.header h2').style.color = headerTextColor;
        document.querySelector('.header h4').style.color = headerTextColor;
        document.querySelector('.header .date-venue').style.color = headerTextColor;
        document.querySelector('.header .team-names').style.color = headerTextColor;
        document.querySelector('.winning-result').style.color = headerTextColor;

        document.querySelector('.inningstm1-section .players ul').style.color = headerTextColor;
        document.querySelector('.inningstm1-section .players .Bowlers-list ul').style.color = headerTextColor;
        document.querySelector('.inningstm2-section .players ul').style.color = headerTextColor;
        document.querySelector('.inningstm2-section .players .Bowlers-list ul').style.color = headerTextColor;

        document.querySelector('.inningstm1-section .team-score').style.backgroundColor = team1BgColor;
        document.querySelector('.inningstm2-section .team-score').style.backgroundColor = team2BgColor;
        document.querySelector('.inningstm1-section .team-score h3').style.color = team1TextColor;
        document.querySelector('.inningstm1-section .team-score p').style.color = team1TextColor;
        document.querySelector('.inningstm1-section .team-score .overs').style.color = team1TextColor;
        document.querySelector('.inningstm2-section .team-score h3').style.color = team2TextColor;
        document.querySelector('.inningstm2-section .team-score p').style.color = team2TextColor;
        document.querySelector('.inningstm2-section .team-score .overs').style.color = team2TextColor;
    }

    function formatList(text) {
        return text.split(',').map(item => `<li>${item.trim()}</li>`).join('');
    }

    function downloadTemplate(format) {
        html2canvas(document.querySelector('.match-summary'), {
            backgroundColor: null
        }).then(canvas => {
            if (!canvas) {
                console.error('Failed to create canvas.');
                return;
            }

            // Create a link element and trigger the download
            const link = document.createElement('a');
            link.href = canvas.toDataURL('image/' + format);
            link.download = 'match-summary.' + format;

            // Simulate a click to trigger the download
            document.body.appendChild(link);
            link.click();

            // Clean up
            document.body.removeChild(link);
        }).catch(error => {
            console.error('Error capturing the template:', error);
        });
    }

    // Update and download on button clicks
    updateBtn.addEventListener('click', function() {
        updateSummary();
    });

    downloadBtn.addEventListener('click', function() {
        updateSummary();
        setTimeout(() => {
            downloadTemplate('png');
        }, 500); // Increased timeout to ensure updates are applied
    });
});
