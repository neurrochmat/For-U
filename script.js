// Animation sequence controller
class AnimationSequence {
    constructor() {
        // Start popup elements
        this.startPopup = {
            overlay: document.getElementById('startPopup'),
            withMusicBtn: document.getElementById('playWithMusicBtn'),
            withoutMusicBtn: document.getElementById('playWithoutMusicBtn')
        };

        // Background music
        this.bgMusic = document.getElementById('bgMusic');
        this.playWithMusic = false;

        // Scene 1 elements
        this.scene1 = {
            container: document.getElementById('scene1'),
            before: document.getElementById('before'),
            digit2: document.getElementById('digit-2'),
            digit0: document.getElementById('digit-0'),
            digit2b: document.getElementById('digit-2b'),
            digit5: document.getElementById('digit-5'),
            end: document.getElementById('end'),
            iWord: document.getElementById('i-word'),
            tell: document.getElementById('tell'),
            you: document.getElementById('you'),
            wanna: document.getElementById('wanna')
        };

        // Scene 2 elements
        this.scene2 = {
            container: document.getElementById('scene2'),
            thank: document.getElementById('thank'),
            you2: document.getElementById('you2'),
            for: document.getElementById('for'),
            comma: document.getElementById('comma'),
            dynamicPhrase: document.getElementById('dynamicPhrase')
        };

        // Scene 3 elements
        this.scene3 = {
            container: document.getElementById('scene3'),
            thankWatchingText: document.getElementById('thankWatchingText')
        };

        // End popup elements
        this.popup = {
            overlay: document.getElementById('popupOverlay'),
            btn: document.getElementById('playAgainBtn')
        };

        // All phrases with their transition effects
        this.phrases = [
            { text: 'believing in me', inAnim: 'anim-fade-in', outAnim: 'anim-fade-out' },
            { text: 'staying by my side', inAnim: 'anim-fade-in', outAnim: 'anim-fade-out' },
            { text: 'never giving up', inAnim: 'anim-rotate-down', outAnim: 'anim-rotate-out' },
            { text: 'understanding me', inAnim: 'anim-slide-left', outAnim: 'anim-slide-out-left' },
            { text: 'supporting my dreams', inAnim: 'anim-scale-pop', outAnim: 'anim-scale-out' },
            { text: 'loving me truly', inAnim: 'anim-bounce-up', outAnim: 'anim-fade-out' },
            { text: 'all your kindness', inAnim: 'anim-blur-in', outAnim: 'anim-blur-out' },
            { text: 'every small moments', inAnim: 'anim-fade-in', outAnim: 'anim-rotate-out' },
            { text: 'motivating me daily', inAnim: 'anim-slide-left', outAnim: 'anim-fade-out' },
            { text: 'trusting my vision', inAnim: 'anim-rotate-down', outAnim: 'anim-slide-out-left' },
            { text: 'your pure energy', inAnim: 'anim-scale-pop', outAnim: 'anim-blur-out' },
            { text: 'your patience', inAnim: 'anim-bounce-up', outAnim: 'anim-scale-out' },
            { text: 'making me stronger', inAnim: 'anim-blur-in', outAnim: 'anim-fade-out' },
            { text: 'wiping my tears', inAnim: 'anim-fade-in', outAnim: 'anim-slide-out-left' },
            { text: 'laughing with me', inAnim: 'anim-scale-pop', outAnim: 'anim-rotate-out' },
            { text: 'your support', inAnim: 'anim-rotate-down', outAnim: 'anim-blur-out' },
            { text: 'every late-night talk', inAnim: 'anim-slide-left', outAnim: 'anim-scale-out' },
            { text: 'accepting real me', inAnim: 'anim-bounce-up', outAnim: 'anim-fade-out' },
            { text: 'being my safe place', inAnim: 'anim-blur-in', outAnim: 'anim-slide-out-left' },
            { text: 'being there', inAnim: 'anim-fade-in', outAnim: 'anim-rotate-out' },
            { text: 'choosing me', inAnim: 'anim-scale-pop', outAnim: 'anim-fade-out' },
            { text: 'not judging me', inAnim: 'anim-rotate-down', outAnim: 'anim-blur-out' },
            { text: 'loving me at my worst', inAnim: 'anim-bounce-up', outAnim: 'anim-scale-out' }
        ];

        this.phraseDurations = this.calculateProgressiveDurations(23, 14000);
        this.currentPhraseIndex = 0;
        this.timeline = [];
        this.isPlaying = false;

        this.init();
    }

    calculateProgressiveDurations(count, totalTime) {
        const minDuration = 500;  // Increased from 250 for better readability
        const maxDuration = 1000;

        const durations = [];
        for (let i = 0; i < count; i++) {
            const progress = i / (count - 1);
            const duration = minDuration + (maxDuration - minDuration) * progress;
            durations.push(Math.round(duration));
        }

        const currentTotal = durations.reduce((a, b) => a + b, 0);
        const overhead = count * 100;
        const targetTotal = totalTime - overhead;
        const scale = targetTotal / currentTotal;

        return durations.map(d => Math.round(d * scale));
    }

    init() {
        // Start popup button handlers
        this.startPopup.withMusicBtn.addEventListener('click', () => {
            this.playWithMusic = true;
            this.startAnimation();
        });

        this.startPopup.withoutMusicBtn.addEventListener('click', () => {
            this.playWithMusic = false;
            this.startAnimation();
        });

        // End popup replay button
        this.popup.btn.addEventListener('click', () => this.replay());
    }

    startAnimation() {
        // Hide start popup
        this.startPopup.overlay.classList.remove('active');

        // Play music if selected
        if (this.playWithMusic && this.bgMusic) {
            this.bgMusic.volume = 0.5;
            this.bgMusic.currentTime = 0;
            this.bgMusic.play().catch(e => console.log('Music play failed:', e));
        }

        // Start animation after popup fades
        setTimeout(() => {
            this.scene1.container.classList.add('active');
            this.startSequence();
        }, 500);
    }

    resetAll() {
        Object.entries(this.scene1).forEach(([key, el]) => {
            if (el && key !== 'container') {
                el.classList.remove('visible', 'typing');
                el.style.opacity = '0';
                el.style.transform = '';
            }
        });

        Object.entries(this.scene2).forEach(([key, el]) => {
            if (el && key !== 'container' && key !== 'dynamicPhrase') {
                el.classList.remove('visible', 'typing');
                el.style.opacity = '0';
                el.style.transform = '';
            }
        });

        this.scene2.dynamicPhrase.className = 'highlight-text';
        this.scene2.dynamicPhrase.textContent = '';
        this.scene2.dynamicPhrase.style.opacity = '0';
        this.scene2.dynamicPhrase.style.fontSize = '';

        this.currentPhraseIndex = 0;

        this.scene1.container.classList.add('active');
        this.scene1.container.classList.remove('fade-out');
        this.scene2.container.classList.remove('active', 'fade-out');
        this.scene3.container.classList.remove('active', 'fade-out');
        this.scene3.thankWatchingText.classList.remove('visible');

        this.popup.overlay.classList.remove('active');

        this.isPlaying = false;

        this.timeline.forEach(timeout => clearTimeout(timeout));
        this.timeline = [];
    }

    typeEffect(element, callback) {
        element.classList.add('typing');
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        setTimeout(() => {
            element.classList.remove('typing');
            if (callback) callback();
        }, 300);
    }

    revealWord(element) {
        return new Promise(resolve => {
            element.classList.add('visible');
            resolve();
        });
    }

    revealDigit(element) {
        return new Promise(resolve => {
            element.classList.add('visible');
            resolve();
        });
    }

    async startSequence() {
        if (this.isPlaying) return;
        this.isPlaying = true;

        await this.playScene1();
        await this.transitionToScene2();
        await this.playScene2();
        await this.transitionToScene3();
        await this.playScene3();
        await this.showPopup();

        this.isPlaying = false;
    }

    async playScene1() {
        const { before, digit2, digit0, digit2b, digit5, end, iWord, tell, you, wanna } = this.scene1;

        this.typeEffect(before);
        await this.wait(400);

        await this.revealDigit(digit2);
        await this.wait(80);
        await this.revealDigit(digit0);
        await this.wait(80);
        await this.revealDigit(digit2b);
        await this.wait(80);
        await this.revealDigit(digit5);

        await this.wait(200);
        await this.revealWord(end);
        await this.wait(200);
        await this.revealWord(iWord);
        await this.wait(200);
        await this.revealWord(wanna);
        await this.wait(200);
        await this.revealWord(tell);
        await this.wait(200);
        await this.revealWord(you);

        await this.wait(500);
    }

    async transitionToScene2() {
        this.scene1.container.classList.add('fade-out');
        await this.wait(400);
        this.scene1.container.classList.remove('active');
        this.scene2.container.classList.add('active');
    }

    async playScene2() {
        const { thank, you2, for: forWord, comma } = this.scene2;

        await this.wait(100);
        await this.revealWord(thank);
        await this.wait(100);
        await this.revealWord(you2);
        await this.wait(100);
        await this.revealWord(forWord);
        await this.wait(100);
        await this.revealWord(comma);
        await this.wait(200);

        for (let i = 0; i < this.phrases.length; i++) {
            const displayDuration = this.phraseDurations[i];

            await this.showPhrase(i);
            await this.wait(displayDuration);

            if (i < this.phrases.length - 1) {
                await this.hidePhrase(i);
                await this.wait(50);
            }
        }
    }

    async showPhrase(index) {
        const phrase = this.phrases[index];
        const el = this.scene2.dynamicPhrase;

        const minSize = 2;
        const maxSize = 4;
        const progress = index / (this.phrases.length - 1);
        const fontSize = minSize + (maxSize - minSize) * progress;

        el.className = 'highlight-text';
        el.textContent = phrase.text;
        el.style.fontSize = `${fontSize}rem`;
        el.style.transition = 'font-size 0.3s ease';

        await this.wait(20);
        el.classList.add(phrase.inAnim);
    }

    async hidePhrase(index) {
        const phrase = this.phrases[index];
        const el = this.scene2.dynamicPhrase;

        el.classList.remove(phrase.inAnim);
        el.classList.add(phrase.outAnim);

        await this.wait(250);
    }

    async transitionToScene3() {
        this.scene2.container.classList.add('fade-out');
        await this.wait(400);
        this.scene2.container.classList.remove('active');
        this.scene3.container.classList.add('active');
    }

    async playScene3() {
        // Show "Thank you for watching" with animation
        await this.wait(300);
        this.scene3.thankWatchingText.classList.add('visible');
        await this.wait(2000); // Display for 2 seconds
    }

    async showPopup() {
        this.scene3.container.classList.add('fade-out');
        await this.wait(500);
        this.popup.overlay.classList.add('active');
        // Music continues playing
    }

    wait(ms) {
        return new Promise(resolve => {
            const timeout = setTimeout(resolve, ms);
            this.timeline.push(timeout);
        });
    }

    replay() {
        this.popup.overlay.classList.remove('active');
        this.resetAll();

        // Restart music if was playing
        if (this.playWithMusic && this.bgMusic) {
            this.bgMusic.currentTime = 0;
            this.bgMusic.play().catch(e => console.log('Music play failed:', e));
        }

        setTimeout(() => this.startSequence(), 300);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.animationSequence = new AnimationSequence();
});
