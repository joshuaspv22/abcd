// Test variable for overriding the current day count (set to null to use actual count)
let testDayCount = null;

document.addEventListener('DOMContentLoaded', () => { // to update date, change daily quote, update image and content (based on certain no. of dates)
        showDailyQuote();
        updateCheckDate(new Date());
        updateKanlunganImage();
        updateKanlunganContent();
    });

    function dismissLoadingScreen() { // function to remove loading screen once pressed/interacted with
        document.getElementById('loadingScreen').style.display = 'none';
        document.getElementById('confirmationDialog').style.display = 'flex';
    }

    function enterSite() { // to initialize homesite after loading screen
        document.getElementById('confirmationDialog').style.display = 'none';
        document.querySelector('.content-wrapper').style.display = 'block';
        document.querySelector('.navbar').style.display = 'flex';
        document.querySelector('.tabs').style.display = 'flex';
        showContent('kanlungan');
        document.body.style.overflow = 'auto';
    }

    function showDailyQuote() { // for daily quotes. Based on dates (changes per day)
        const today = new Date();
        const day = today.getDate();
        const quoteIndex = (day - 1) % quotes.length;
        document.getElementById('daily-quote').textContent = quotes[quoteIndex];

        const formattedDate = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }); // for date format
        document.getElementById('current-date').textContent = formattedDate;
    }

    function updateCheckDate(today) { // checms date today, and helps in determining content for days accessed and last checked in html
        const lastCheck = localStorage.getItem('lastQuoteCheck');
        const currentDateStr = today.toISOString().split('T')[0];

        if (!lastCheck || currentDateStr !== lastCheck) {
            let checkCount = parseInt(localStorage.getItem('checkCount') || '0', 10);
            checkCount += 1;
            localStorage.setItem('checkCount', checkCount);
            localStorage.setItem('lastQuoteCheck', currentDateStr);
        }

        // Get the actual count from localStorage
        let checkCount = parseInt(localStorage.getItem('checkCount') || '0', 10);
        
        // Use test day count if it's set
        if (testDayCount !== null) {
            console.log(`Navbar - Using test day count: ${testDayCount} (actual: ${checkCount})`);
            checkCount = testDayCount;
        }
        
        // Update the UI with either the actual or test count
        document.getElementById('days-accessed').textContent = `Days Accessed: [${checkCount}/30]`;
        document.getElementById('last-accessed').textContent = `Last checked: ${lastCheck || 'None'}`;
        updateKanlunganImage();
    }

    function updateKanlunganContent() { // function for changing lore based on no. of dates (html and previous js functions)
        // Get the actual count from localStorage
        let visitCount = parseInt(localStorage.getItem('checkCount') || '0', 10);
        
        // Use test day count if it's set
        if (testDayCount !== null) {
            console.log(`Content - Using test day count: ${testDayCount} (actual: ${visitCount})`);
            visitCount = testDayCount;
        }
        
        let textContent = "introduced in the mystical world of comfort and kindness in the Eons, a little scrawny kitty never truly fit in. devilish, small, and boyishly mischievous? well, the elders of the eons were quick to politely settle down Nasia to house-work instead of one of the Euphorias—the ever ethereal counsellors that urged into the mortal world as real streetward cats, cooing and purring their way into lost human hearts' homes. out of boredom, Nasia had jumped into the many sparkle portals and into the human realm. finding a little child around her age yelling for their mom, the cat steps into the wet, pavement and guides its way home, dripping rain almost like certain falling blocks...";
        
        if (visitCount >= 15) {
            textContent = "Nasia—now an eighteen year old being—sometimes startles awake with the young adult's clamors of busy calls and sharp deadlines. she paces back and forth with them, human 'pahs-powrts' strewed and a new photo on the shelf with a black robe and odd boxy hat of sorts. there is a hefty bill paid she picks in one of their phone calls: something about choosing not to pursue a STEM course, or whatever that means. she had noticed, by the years, that steely plastic periodic tables and half-hearted physics formulas were replaced by lovingly pinned quotes everyday and specifically formatted words as so they were in verses. the young adult's room now, though, has turned into a pile of boxes and rain dripping down their eyes that Nasia couldn't understand. with a tight hug from them and their mom and a silent ride to his old highschool Nasia had visited a few times before, she's put in a box and given someone with a soft smile and a rectangular card thing hanging from his necklace of sorts. Nasia watches curiously as the adult-teen-kid and their parent leave, scrambling around her box to see that they left behind their formatted-words notebook. rumors have it now, that in the many cats in PISAY, one leaves behind pages of poems in her wake, still waiting, still missing...";
        } else if (visitCount >= 5) {
            textContent = "years pass on, the two becoming close friends and the kid's mom allowing them to keep Nasia as a household pet—completely unaware of her magical state. she eventually learnt to keep a tight schedule and disappear in the night, though it eventually had gotten trickier with all the requirements the kid, now teenager, had to finish for school. Nasia's coyly deliquent demeanor had morphed, becoming a rather more playful one instead. with her disguise as a cat, she had no way of expressing her affections for the teen. no way, of course, but discreetly leaving post-it notes of hearts and flowers on the oblivious teen's desk that diminished the next day after he saw them...";
        }

        const kanlunganParagraph = document.querySelector('.kanlungan-container .text-column p');
        if (kanlunganParagraph) {
            kanlunganParagraph.textContent = textContent;
        }
    }

    function updateKanlunganImage() { // function for changing images based on no. of dates (html and previous js functions)
        // Get the actual count from localStorage
        let visitCount = parseInt(localStorage.getItem('checkCount') || '0', 10);
        
        // Use test day count if it's set
        if (testDayCount !== null) {
            console.log(`Image - Using test day count: ${testDayCount} (actual: ${visitCount})`);
            visitCount = testDayCount;
        }
        
        let imagePath = 'https://cdn.glitch.global/a141060a-d4e4-465b-82a4-de139674d3a4/Copy%20of%20l1.jpg?v=1734710831171';

        if (visitCount >= 15) {
            imagePath = 'https://cdn.glitch.global/a141060a-d4e4-465b-82a4-de139674d3a4/Copy%20of%20l2.jpg?v=1734696461354';
        } else if (visitCount >= 5) {
            imagePath = 'https://cdn.glitch.global/a141060a-d4e4-465b-82a4-de139674d3a4/Copy%20of%20l2.jpg?v=1734696461354';
        }

        const kanlunganImage = document.querySelector('.kanlungan-container .image-column img');
        if (kanlunganImage) {
            kanlunganImage.src = imagePath;
        }
    }

    function showContent(id) {
        document.querySelectorAll('.content-section').forEach(section => section.style.display = 'none');

        const activeSection = document.getElementById(`content-${id}`);
        if (activeSection) {
            activeSection.style.display = 'block';
        }

        // Remove active class and images from all tabs
        document.querySelectorAll('.tab-link').forEach(link => {
            link.classList.remove('active');
            const img = link.querySelector('img');
            if (img) {
                img.remove();
            }
        });

        // Add active class and image to the current tab
        const activeTab = document.querySelector(`[onclick="showContent('${id}')"]`);
        if (activeTab) {
            activeTab.classList.add('active');
            
            const img = document.createElement('img');
            img.src = 'https://cdn.glitch.global/a141060a-d4e4-465b-82a4-de139674d3a4/Copy%20of%20indicator.png?v=1734793912876';
            img.alt = 'icon';
            img.style.width = '24px';
            img.style.height = '24px';
            img.style.marginRight = '3px';
            activeTab.prepend(img);
        }

        if (id === 'about') {
            initializeTetris();
            resetTetris();
        }
        
        // Initialize achievements and art gallery when that section is shown
        if (id === 'aaa') {
            initializeAchievementsAndArt();
            setupGalleryImageModal();
        }
    }

    function addMessage() { // function for receiving and accepting images in html. Posts texts afterward.
        const name = document.getElementById('guest-name').value;
        const message = document.getElementById('guest-message').value;
        const messagesBoard = document.getElementById('messages-board');

        if (name && message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message');
            messageElement.style.backgroundColor = getRandomColor();
            messageElement.textContent = `${message} - ${name}`;
            messagesBoard.appendChild(messageElement);

            document.getElementById('guest-name').value = '';
            document.getElementById('guest-message').value = '';
            
            // Increment post-it count for achievement tracking
            const postItCount = parseInt(localStorage.getItem('postItCount') || '0', 10) + 1;
            localStorage.setItem('postItCount', postItCount);
            
            // Update Write-A-Lot achievement if on achievements page
            if (document.getElementById('achievement-write-a-lot')) {
                updateAchievementProgress('write-a-lot', postItCount, 50);
            }
        }
    }

    function getRandomColor() { // function for getting a random color
        const colors = ['#b5ead7', '#f6ab6c', '#fde8f7', '#ff9aae', '#ffccf9'];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    const quotes = [ // function for changing quotes based on day changes
        "“never to suffer would never to have been blessed.” - edgar allan poe",
        "“the only way to deal with an unfree world is to become so absolutely free that your very existence is an act of rebellion.” - albert camus",
        "“life shrinks or expands in proportion to one’s courage.” - anaïs nin",
        "“a room without books is like a body without a soul.” - marcus tullius cicero",
        "“be yourself; everyone else is already taken.” - oscar wilde",
        "Shoot for the moon. Even if you miss, you’ll land among the stars.” – Norman Vincent Peale",
        "“The best way to predict your future is to create it.” – Peter Drucker",
        "“if you cannot do great things, do small things in a great way.” - napoleon hill",
        "“to be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.” - ralph waldo emerson",
        "“even the darkest night will end, and the sun will rise.” – victor hugo",
        "“a ship is safe in harbor, but that’s not what ships are for.” – john a. shedd",
        "“if we were meant to stay in one place, we’d have roots instead of feet.” – rachel wolchin",
        "“you miss 100% of the shots you don’t take.” – wayne gretzky",
        "“tell me and i forget. teach me and i remember. involve me and i learn.” – benjamin franklin",
        "“he who opens a school door, closes a prison.” – victor hugo",
        "“if you can dream it, you can do it.” – walt disney",
        "“the journey of a thousand miles begins with one step.” – lao tzu",
        "“no one has ever become poor by giving.” – anne frank",
        "“do not go where the path may lead, go instead where there is no path and leave a trail.” – ralph waldo emerson",
        "“i have not failed. i’ve just found 10,000 ways that won’t work.” – thomas edison",
        "“the road to success and the road to failure are almost exactly the same.” – colin r. davis",
        "“learn from yesterday, live for today, hope for tomorrow.” – albert einstein",
        "“happiness can be found even in the darkest of times if one only remembers to turn on the light.” – j.k. rowling",
        "“the sun himself is weak when he first rises, and gathers strength and courage as the day gets on.” – charles dickens",
        "“innovation distinguishes between a leader and a follower.” – steve jobs",
        "“don’t count the days, make the days count.” – muhammad ali",
        "“the only way to have a friend is to be one.” – ralph waldo emerson",
        "“we don’t see things as they are; we see them as we are.” – anaïs nin",
        "“everything has beauty, but not everyone sees it.” – confucius",
        "“twenty years from now you will be more disappointed by the things that you didn’t do than by the ones you did do.” – mark twain"
    ];
    
    let canvas, context, nextCanvas, nextContext;
    let arena, player, nextPiece, colors;
    let dropCounter = 0;
    let dropInterval = 1000;
    let lastTime = 0;

    function initializeTetris() {
        // Remove existing canvases if they exist
        const existingCanvas = document.getElementById('tetrisCanvas');
        const existingNextCanvas = document.getElementById('nextPieceCanvas');

        if (existingCanvas) {
            existingCanvas.remove();
        }
        if (existingNextCanvas) {
            existingNextCanvas.remove();
        }

        // Create new canvases
        const tetrisBoard = document.querySelector('.tetris-board');
        
        const newCanvas = document.createElement('canvas');
        newCanvas.id = 'tetrisCanvas';
        newCanvas.width = 240;
        newCanvas.height = 400;
        tetrisBoard.appendChild(newCanvas);

        const newNextCanvas = document.createElement('canvas');
        newNextCanvas.id = 'nextPieceCanvas';
        newNextCanvas.width = 120;
        newNextCanvas.height = 120;
        tetrisBoard.appendChild(newNextCanvas);

        // Get contexts for the new canvases
        canvas = document.getElementById('tetrisCanvas');
        context = canvas.getContext('2d');
        context.scale(20, 20);

        nextCanvas = document.getElementById('nextPieceCanvas');
        nextContext = nextCanvas.getContext('2d');
        nextContext.scale(20, 20);

        // Initialize game elements
        arena = createMatrix(12, 20);
        colors = [
            null,
            '#f6e8df',
            '#ff9e7b',
            '#95eed8',
            '#ffc446',
            '#bbdee4',
            '#8ca4d8',
            '#f6e8df',
        ];

        nextPiece = createPiece();
        player = {
            position: { x: 0, y: 0 },
            matrix: null,
            score: 0,
        };

        playerReset();
        updateScore();
        update();

        document.addEventListener('keydown', handleKey);
    }

    function handleKey(event) { // function for tetris element movements
        if (event.key === 'ArrowLeft') {
            playerMove(-1);
        } else if (event.key === 'ArrowRight') {
            playerMove(1);
        } else if (event.key === 'ArrowDown') {
            playerDrop();
        } else if (event.key === 'q') {
            playerRotate(-1);
        } else if (event.key === 'w') {
            playerRotate(1);
        }
    }

    function createPiece(type = 'ILJOTSZ'[(Math.random() * 7) | 0]) { // function for tetris element shapes
        const pieces = {
            'T': [
                [0, 0, 0],
                [5, 5, 5],
                [0, 5, 0]
            ],
            'O': [
                [7, 7],
                [7, 7]
            ],
            'L': [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2]
            ],
            'J': [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0]
            ],
            'I': [
                [0, 4, 0, 0],
                [0, 4, 0, 0],
                [0, 4, 0, 0],
                [0, 4, 0, 0]
            ],
            'S': [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0]
            ],
            'Z': [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0]
            ]
        };
        return pieces[type];
    }

    function drawMatrix(matrix, offset, ctx = context) {
        matrix.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    ctx.fillStyle = colors[value];
                    ctx.fillRect(x + offset.x, y + offset.y, 1, 1);
                }
            });
        });
    }

    function draw() { // function tetris element movement
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawMatrix(arena, { x: 0, y: 0 });
        drawMatrix(player.matrix, player.position);
        drawNextPiece();
    }

    function drawNextPiece() { 
        nextContext.clearRect(0, 0, nextCanvas.width, nextCanvas.height);
        drawMatrix(nextPiece, { x: 1, y: 1 }, nextContext);
    }

    function merge(arena, player) {
        player.matrix.forEach((row, y) => { // function for tetris element merging
            row.forEach((value, x) => {
                if (value !== 0) {
                    arena[y + player.position.y][x + player.position.x] = value;
                }
            });
        });
    }

    function rotate(matrix, dir) { // function for rotation of elements
        for (let y = 0; y < matrix.length; ++y) {
            for (let x = 0; x < y; ++x) {
                [
                    matrix[x][y],
                    matrix[y][x],
                ] = [
                    matrix[y][x],
                    matrix[x][y],
                ];
            }
        }
        if (dir > 0) {
            matrix.forEach(row => row.reverse());
        } else {
            matrix.reverse();
        }
    }

    function playerReset() { // function for resetting board content when pressed
        player.matrix = nextPiece;
        nextPiece = createPiece();
        player.position.y = 0;
        player.position.x = (arena[0].length / 2 | 0) -
            (player.matrix[0].length / 2 | 0);
        if (collide(arena, player)) {
            arena.forEach(row => row.fill(0));
            player.score = 0;
            updateScore();
        }
    }

    function playerDrop() { 
        player.position.y++;
        if (collide(arena, player)) {
            player.position.y--;
            merge(arena, player);
            playerReset();
            arenaSweep();
            updateScore();
        }
        dropCounter = 0;
    }

    function playerMove(dir) { // function for player movement
        player.position.x += dir;
        if (collide(arena, player)) {
            player.position.x -= dir;
        }
    }

    function playerRotate(dir) { // function for player rotation
        const pos = player.position.x;
        let offset = 1;
        rotate(player.matrix, dir);
        while (collide(arena, player)) {
            player.position.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > player.matrix[0].length) {
                rotate(player.matrix, -dir);
                player.position.x = pos;
                return;
            }
        }
    }

    function arenaSweep() { // function for collision deletion
      let rowCount = 1;
        outer: for (let y = arena.length - 1; y > 0; --y) {
            for (let x = 0; x < arena[y].length; ++x) {
                if (arena[y][x] === 0) {
                   	continue outer;
                }
            }
            const row = arena.splice(y, 1)[0].fill(0);
            arena.unshift(row);
            ++y;

            player.score += rowCount * 10;
            rowCount *= 2;
        }
    }

    function collide(arena, player) { // function for tetris block collision determiner
        const [m, o] = [player.matrix, player.position];
        for (let y = 0; y < m.length; ++y) {
            for (let x = 0; x < m[y].length; ++x) {
                if (m[y][x] !== 0 &&
                    (arena[y + o.y] &&
                        arena[y + o.y][x + o.x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    function createMatrix(w, h) {
        const matrix = [];
        while (h--) {
            matrix.push(new Array(w).fill(0));
        }
        return matrix;
    }

    function updateScore() { // function for updating scores
        const scoreElement = document.getElementById('score');
        if (scoreElement) {
            scoreElement.innerText = player.score;
            
            // Update high score if current score is higher
            const currentHighScore = parseInt(localStorage.getItem('tetrisHighScore') || '0', 10);
            if (player.score > currentHighScore) {
                localStorage.setItem('tetrisHighScore', player.score);
                
                // Update Laro achievement if on achievements page
                if (document.getElementById('achievement-laro')) {
                    updateAchievementProgress('laro', player.score, 50);
                }
            }
        }
    }

    function update(time = 0) { // function for drop interval time
        const deltaTime = time - lastTime;
        lastTime = time;

        dropCounter += deltaTime;
        if (dropCounter > dropInterval) {
            playerDrop();
        }

        draw();
        requestAnimationFrame(update);
    }

    function resetTetris() { // function for resetting tetris blocks
        if (arena) {
            arena.forEach(row => row.fill(0));
        }
        if (player) {
            player.score = 0;
            updateScore();
            playerReset();
        }
    }

    // Achievement and Art Gallery functionality
    function initializeAchievementsAndArt() {
        // Get visit count from localStorage
        let visitCount = parseInt(localStorage.getItem('checkCount') || '0', 10);
        
        // Use test day count if it's set
        if (testDayCount !== null) {
            console.log(`Using test day count: ${testDayCount} (actual: ${visitCount})`);
            visitCount = testDayCount;
        }
        
        // Get post-it count from localStorage (create if doesn't exist)
        const postItCount = parseInt(localStorage.getItem('postItCount') || '0', 10);
        
        // Get tetris high score from localStorage
        const tetrisHighScore = parseInt(localStorage.getItem('tetrisHighScore') || '0', 10);
        
        // Update achievements progress
        updateAchievementProgress('good-morning', visitCount, 5);
        updateAchievementProgress('hello-neighbour', visitCount, 20);
        updateAchievementProgress('write-a-lot', postItCount, 50);
        updateAchievementProgress('laro', tetrisHighScore, 50);
        updateAchievementProgress('loyal-partner', visitCount, 100);
        
        // Update art gallery
        updateArtGallery(visitCount);
    }

    function updateAchievementProgress(achievementId, currentValue, targetValue) {
        const achievementElement = document.getElementById(`achievement-${achievementId}`);
        if (!achievementElement) return;
        
        const progressBar = achievementElement.querySelector('.progress');
        const progressText = achievementElement.querySelector('.progress-text');
        const achievementImage = achievementElement.querySelector('.achievement-image');
        
        // Calculate progress percentage (capped at 100%)
        const progressPercentage = Math.min((currentValue / targetValue) * 100, 100);
        
        // Update progress bar width if it exists
        if (progressBar) {
            progressBar.style.width = `${progressPercentage}%`;
        }
        
        // Update progress text if it exists
        if (progressText) {
            progressText.textContent = `${currentValue}/${targetValue}`;
        }
        
        // Mark as unlocked if completed
        if (currentValue >= targetValue) {
            achievementElement.classList.add('unlocked');
            
            // Change image border color for unlocked achievements
            if (achievementImage) {
                achievementImage.style.borderColor = '#4caf50';
            }
            
            // Store achievement completion in localStorage
            localStorage.setItem(`achievement-${achievementId}`, 'unlocked');
        }
    }

    function updateArtGallery(visitCount) {
        const artItems = document.querySelectorAll('.art-item');
        
        // Display the current day count for testing
        console.log(`Art Gallery - Using day count: ${visitCount}`);
        
        // First art piece is always unlocked
        if (artItems[0]) {
            artItems[0].classList.remove('locked');
            const lockOverlay = artItems[0].querySelector('.lock-overlay');
            if (lockOverlay) lockOverlay.remove();
        }
        
        // Second art piece unlocks at 20 days
        if (artItems[1] && visitCount >= 20) {
            artItems[1].classList.remove('locked');
            const lockOverlay = artItems[1].querySelector('.lock-overlay');
            if (lockOverlay) lockOverlay.remove();
            artItems[1].querySelector('.date-achieved').textContent = `date achieved: ${getCurrentDate()}`;
        }
        
        // Third art piece unlocks at 100 days or all achievements unlocked
        const allAchievementsUnlocked =
            localStorage.getItem('achievement-good-morning') === 'unlocked' &&
            localStorage.getItem('achievement-hello-neighbour') === 'unlocked' &&
            localStorage.getItem('achievement-write-a-lot') === 'unlocked' &&
            localStorage.getItem('achievement-laro') === 'unlocked' &&
            localStorage.getItem('achievement-loyal-partner') === 'unlocked';
        
        if (artItems[2] && (visitCount >= 100 || allAchievementsUnlocked)) {
            artItems[2].classList.remove('locked');
            const lockOverlay = artItems[2].querySelector('.lock-overlay');
            if (lockOverlay) lockOverlay.remove();
            artItems[2].querySelector('.date-achieved').textContent = `date achieved: ${getCurrentDate()}`;
        }
    }

    function getCurrentDate() {
        const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
        const date = new Date();
        const day = date.getDate();
        const month = months[date.getMonth()];
        const year = date.getFullYear();
        
        // Add ordinal suffix to day
        let suffix = 'th';
        if (day === 1 || day === 21 || day === 31) suffix = 'st';
        else if (day === 2 || day === 22) suffix = 'nd';
        else if (day === 3 || day === 23) suffix = 'rd';
        
        return `${month} ${day}${suffix}, ${year}`;
    }
    
    // Function to set test day count and refresh all day-dependent content
    function setTestDayCount(count) {
        testDayCount = count;
        console.log(`Test day count set to: ${count !== null ? count : 'actual (using localStorage)'}`);
        
        // Update all day-dependent content
        updateCheckDate(new Date());
        updateKanlunganContent();
        updateKanlunganImage();
        initializeAchievementsAndArt();
        
        return `Day count set to ${count !== null ? count : 'actual (using localStorage)'}. All content updated.`;
    }

    function setupGalleryImageModal() {
        // Get modal elements
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('expandedImage');
        const closeModal = document.querySelector('.close-modal');
        
        // Add click event to all gallery images that aren't locked
        document.querySelectorAll('.art-item:not(.locked) .art-frame').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                modal.style.display = 'block';
                modalImg.src = img.src;
            });
        });
        
        // Close modal when clicking the × button
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside the image
        if (modal) {
            modal.addEventListener('click', function(event) {
                if (event.target === modal) {
                    modal.style.display = 'none';
                }
            });
        }
    }