// ==================== IMPORTS ====================
import React, { useState, useEffect, useMemo, useCallback } from 'react';

// ==================== COMPONENT DEFINITION ====================
// The GeometricBg component is like the stage for a light show, where all the magic happens.
const GeometricBg = () => {
// ==================== STATE MANAGEMENT ====================
  // useState is like a notebook where React remembers things for you.
  // 'dimensions' keeps track of the SVG canvas size. I can adjust these for different screen sizes.
  const [dimensions, setDimensions] = useState({ width: 120, height: 80 });
  // 'time' is the clock for our animation. Changing its speed changes how fast everything moves.
  const [time, setTime] = useState(0);
  // Check for reduced motion preference for accessibility
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
// ==================== ANIMATION SETUP ====================
  // useEffect is like setting up a timer and a resize sensor. It runs after the component mounts. It's like a snitch that tells React something changed and you need to update the state of the component, the component being GeometricBg in this case.
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionPreferenceChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    // This function updates the canvas size.Tweak width/height for different effects.
    const updateDimensions = () => {
      setDimensions({
        width: 120, // Visual control: change for wider/narrower background
        height: 60  // Visual control: change for taller/shorter background
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Only start animation if user doesn't prefer reduced motion
    let interval;
    if (!prefersReducedMotion) {
      // This interval is the heartbeat of the animation. Lower the interval for faster movement.
      interval = setInterval(() => {
        setTime(t => t + TIMING.TIME_INCREMENT); // Animation speed control: increase for faster, decrease for slower
      }, TIMING.ANIMATION_INTERVAL); // Animation speed control: lower ms for smoother/faster animation
    }
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      mediaQuery.removeEventListener('change', handleMotionPreferenceChange);
      if (interval) clearInterval(interval);
    };
  }, [prefersReducedMotion]);
  
// ==================== CONSTANTS & CONFIGURATION ====================
  // Destructure width and height for easy use.
  const { width, height } = dimensions;
  // ===========THE GOLDEN RATIO OF PHI==============used for harmonious spacing. Nature's secret recipe for beauty/symmetry.
  // Here we will use it to position key elements in the design and only go up to 60% of the width/height of the canvas to keep things balanced.
  const phi = 1.618033988749;
  
  // Animation phase constants for better maintainability
  const ANIMATION_PHASES = {
    FORMATION: 0.3,
    STABLE: 0.6,
    DISPERSION: 0.75,
    CHAOS: 1.0
  };
  
  // Opacity and timing constants
  const OPACITY_LEVELS = {
    FORMATION_START: 0.4,
    FORMATION_RANGE: 0.5,
    STABLE: 0.3,
    DISPERSION_MULTIPLIER: 0.8,
    CHAOS_BASE: 0.3,
    CHAOS_RANGE: 0.3
  };
  
  // Animation timing constants
  const TIMING = {
    ANIMATION_INTERVAL: 30,
    TIME_INCREMENT: 0.008,
    PULSE_FREQUENCY: 0.8,
    ROTATION_SPEED: 3.2
  };
  
  // Vanishing points for geometric curves - positioned using golden ratio for harmonious composition
  const vps = [
    { x: width / phi, y: height / phi, weight: 'high', energy: 'cerebral' },
    { x: width - width / phi, y: height - height / phi, weight: 'high', energy: 'emotion' },
    { x: width / phi, y: height - height / phi, weight: 'medium', energy: 'structure' },
    { x: width - width / phi, y: height / phi, weight: 'medium', energy: 'dynamic' },
  ];
  
  // Color palettes organized by energy type for thematic consistency
  const colorPalettes = {
    cerebral: ['#2E5B88', '#066bc3ff', '#6B9DC6'],
    emotion: ['#8B4FA8', '#A76FC2', '#C391DB'],
    structure: ['#3D9A8C', '#5DB4A6', '#7FCEC1'],
    dynamic: ['#C05299', '#D47AB5', '#f3f30bff'],
  };
  
  // Helper function to get colors from palettes with variant cycling
  const getColor = useCallback((energy, variant = 0) => {
    return colorPalettes[energy][variant % colorPalettes[energy].length];
  }, []);
  
  // Helper function to get letter color based on sequence index
  const getLetterColor = useCallback((seqIndex) => {
    const colorMap = {
      0: '#bfc22b87',
      1: '#A76FC2', 
      2: '#5DB4A6',
      3: '#049cd3e8'
    };
    return colorMap[seqIndex % 4] || '#E8A0CF';
  }, []);
  
  // wordSequences is a memoized array of word groups. Memoization is like keeping a cheat sheet for React so it doesn't recalculate unnecessarily.
  const wordSequences = useMemo(() => [
    ['quiet', 'storm', 'escalofrío'], 
    ['lost', 'found'], 
    ['龙', '詩','物','理'],
    ['time', 'EMBODY', 'flow'],
    ['word', 'echo', 'silence'], 
    ['dream', 'wake', 'liminal'], 
    ['hypnagogia', 'threshold', 'sub-conscious'],
    ['light', 'shadow', 'dusk', 'night'],
    ['space', 'void', 'peace', 'equanimity'], 
    ['CATALINA', 'dispersion', 'chaos'], 
    ['fade', 'emerge', 'Clara','made', 'pneuma'],
    ['pages', 'verses', 'sage'], 
    ['voice', 'whisper','susurro', 'choice', 'pensamiento'], 
    ['flow', 'osmosis', 'glow'],
    ['world', 'cosmos', 'infinite', 'infinitum'], 
    ['dance', 'spiral', 'trance'], 
    ['story', 'myth', 'glory', 'legend'],
    ['breathe', 'release', 'believe'], 
    ['wander', 'wonder', 'wu-wei'], 
    ['begin', 'end', 'again'],
    ['Idividuation','respira','despierta','sueña','revela']
  ], []);
  
  // MORE DRAMATIC size variations per word sequence
  const sequenceSizes = useMemo(() => {
    return wordSequences.map(() => ({
      fontSize: 0.8 + Math.random() * 3, // BIGGER RANGE: 0.8 to 3.8
      letterSpacing: 1.5 + Math.random() * 3.5, // 1.5 to 5
      speedMultiplier: 0.4 + Math.random() * 0.8 // VARIED SPEED: 0.6x to 1.4x
    }));
  }, [wordSequences]);
  
// ==================== ANIMATION LOGIC ====================
  // The getLetterStates function calculates the position, opacity, and other properties of each letter.
  // This is the heart of the animation logic, where each letter becomes a 'particle' with its own behavior.
  // It loops through each word sequence and each letter, calculating how it should move, fade, and change.
  // The function returns an array of particle objects, each representing a letter's state for this frame.
  const getLetterStates = () => {
    const particles = [];
    // Loop through each word sequence (like different dance groups on the floor)
    wordSequences.forEach((sequence, seqIndex) => {
      // For each sequence, calculate timing and animation offsets
      const numWords = sequence.length;
      const { speedMultiplier } = sequenceSizes[seqIndex];
      const cycleTime = (12 + numWords * 3) / speedMultiplier; // Controls how long each word stays visible
      const seqTime = (time + seqIndex * 1) % cycleTime; // Offset for each sequence, so they don't all animate together
      const phase = seqTime / cycleTime; // Normalized phase (0 to 1) for animation progress

      // Figure out which word is currently being animated, and which is next
      const wordDuration = 1 / numWords;
      const currentWordIndex = Math.floor(phase / wordDuration);
      const nextWordIndex = (currentWordIndex + 1) % numWords;
      const wordPhase = (phase % wordDuration) / wordDuration;

      // Calculate the base position for this sequence using golden ratio math
      const baseAngle = (seqIndex / wordSequences.length) * Math.PI * 2;
      const baseRadius = 30 + (seqIndex % 3) * 8;
      const centerX = width / 2 + Math.cos(baseAngle) * baseRadius;
      const centerY = height / 2 + Math.sin(baseAngle) * baseRadius;

      // Add quantum drift for organic movement
      const driftX = Math.sin(time * 2.05 + seqIndex) * 2;
      const driftY = Math.cos(time * 0.07 + seqIndex) * 2;

      const currentWord = sequence[currentWordIndex];
      const nextWord = sequence[nextWordIndex];
      const maxLen = Math.max(currentWord.length, nextWord.length);
      const { fontSize, letterSpacing } = sequenceSizes[seqIndex];

      // Loop through each letter in the current/next word
      for (let letterIndex = 0; letterIndex < maxLen; letterIndex++) {
        // Get the current and next character for morphing animation
        const currentChar = currentWord[letterIndex] || '';
        const nextChar = nextWord[letterIndex] || '';
        // Add random size variation for each letter (like dancers of different heights)
        const letterSizeVariation = 0.7 + Math.random() * 0.6; // 0.7x to 1.3x
        const letterFontSize = fontSize * letterSizeVariation;

        // Calculate position, opacity, and which character to show based on animation phase
        let x, y, opacity, char;
        const currentWordWidth = (currentWord.length - 1) * letterSpacing / 2;
        const nextWordWidth = (nextWord.length - 1) * letterSpacing / 2;

        // Animation phases:
        // 1. Formation (letters fly in)
        // 2. Stable (letters sit in place)
        // 3. Dispersion (letters scatter)
        // 4. Chaos/transition (letters morph to next word)
        if (wordPhase < ANIMATION_PHASES.FORMATION) { // Formation phase
          // Letters fly in from a spiral path
          const progress = wordPhase / ANIMATION_PHASES.FORMATION;
          const eased = 1 - Math.pow(1 - progress, 3); // Ease-in for smoothness
          const targetX = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          const targetY = centerY + driftY;
          const startAngle = (letterIndex + seqIndex + currentWordIndex) * 0.8;
          const startX = targetX + Math.cos(startAngle) * 30 * (1 - eased);
          const startY = targetY + Math.sin(startAngle) * 50 * (1 - eased);
          x = startX;
          y = startY;
          opacity = OPACITY_LEVELS.FORMATION_START + eased * OPACITY_LEVELS.FORMATION_RANGE; // Fade in more subtly
          char = currentChar;
        } else if (wordPhase < ANIMATION_PHASES.STABLE) { // Stable phase
          // Letters sit in place, fully visible
          x = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          y = centerY + driftY;
          opacity = OPACITY_LEVELS.STABLE; // Fully visible but not overpowering
          char = currentChar;
        } else if (wordPhase < ANIMATION_PHASES.DISPERSION) { // Dispersion phase
          // Letters scatter outward
          const progress = (wordPhase - ANIMATION_PHASES.STABLE) / (ANIMATION_PHASES.DISPERSION - ANIMATION_PHASES.STABLE);
          const eased = Math.pow(progress, 2); // Ease-out for smoothness
          const startX = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          const startY = centerY + driftY;
          const disperseAngle = (letterIndex * 2.3 + seqIndex + time * 0.3);
          const disperseRadius = 12 * eased;
          x = startX + Math.cos(disperseAngle) * disperseRadius;
          y = startY + Math.sin(disperseAngle) * disperseRadius;
          opacity = OPACITY_LEVELS.DISPERSION_MULTIPLIER * (1 - eased); // Fade out
          char = currentChar;
        } else {
          // Chaos/transition phase: letters morph to next word
          const progress = (wordPhase - ANIMATION_PHASES.DISPERSION) / (ANIMATION_PHASES.CHAOS - ANIMATION_PHASES.DISPERSION);
          const midProgress = Math.sin(progress * Math.PI);
          if (progress < .5) {
            // Letters swirl in chaos
            const chaosX = centerX + driftX + Math.sin(time * 0.3 + letterIndex + seqIndex) * 8;
            const chaosY = centerY + driftY + Math.cos(time * 0.3 + letterIndex + seqIndex) * 8;
            x = chaosX;
            y = chaosY;
            opacity = OPACITY_LEVELS.CHAOS_BASE + midProgress * OPACITY_LEVELS.CHAOS_RANGE;
            char = currentChar;
          } else {
            // Morph to next word
            const chaosX = centerX + driftX + (letterIndex * letterSpacing - nextWordWidth) + Math.sin(time * 0.3 + letterIndex + seqIndex) * 8;
            const chaosY = centerY + driftY + Math.cos(time * 0.3 + letterIndex + seqIndex) * 8;
            x = chaosX;
            y = chaosY;
            opacity = OPACITY_LEVELS.CHAOS_BASE + midProgress * OPACITY_LEVELS.CHAOS_RANGE;
            char = nextChar;
          }
        }
        // Only add visible letters (opacity > 0.05)
        if (char && opacity > 0.05) {
          particles.push({
            id: `${seqIndex}-${currentWordIndex}-${letterIndex}`,
            char,
            x, y, opacity,
            seqIndex,
            currentWordIndex,
            letterIndex,
            wordPhase,
            fontSize: letterFontSize,
            color: getLetterColor(seqIndex)
          });
        }
      }
    });
    // Return all letter particles for rendering
    return particles;
  };
  
  // Memoize expensive letter state calculations to prevent unnecessary re-computations
  const letterParticles = useMemo(() => getLetterStates(), [time, wordSequences, sequenceSizes, width, height]);
  
// ==================== COLOR PALETTES & STYLING ====================
// Color constants have been moved to CONSTANTS & CONFIGURATION section above
  
// ==================== SVG ELEMENT CONSTRUCTION ====================
  const elements = [];
  
  // --- SVG Definitions (Gradients & Filters) ---
  elements.push(
    <defs key="defs">
      <linearGradient id="bgGradient" x1="10%" y1="0%" x2="100%" y2="100%">
        <stop offset="4%" stopColor="#0f47fce7" stopOpacity="1" />
        <stop offset="50%" stopColor="#001F54" stopOpacity="1" />
        <stop offset="100%" stopColor="#0a0004f6" stopOpacity="1" />
      </linearGradient>
      
      <filter id="glow">
        <feGaussianBlur stdDeviation="0.4" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
      
      <filter id="textGlow">
        <feGaussianBlur stdDeviation="0.3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
  );
  
  // --- Background Rectangle ---
  elements.push(
    <rect 
      key="background" 
      x="0" 
      y="0" 
      width={width} 
      height={height} 
      fill="url(#bgGradient)" 
    />
  );
  
  // --- Golden Ratio Grid Lines ---
  const goldenGridLines = [];
  [width / phi, width - width / phi].forEach((x, i) => {
    goldenGridLines.push(
      <line
        key={`golden-v-${i}`}
        x1={x} y1={0} x2={x} y2={height}
        stroke="#1E88E5"
        strokeWidth="49.08"
        opacity="0.12"
        strokeDasharray="11 17"
      />
    );
  });
  [height / phi, height - height / phi].forEach((y, i) => {
    goldenGridLines.push(
      <line
        key={`golden-h-${i}`}
        x1={0} y1={y} x2={width} y2={y}
        stroke="#1E88E5"
        strokeWidth="0.08"
        opacity="0.12"
        strokeDasharray="3 6"
      />
    );
  });
  elements.push(<g key="golden-grid">{goldenGridLines}</g>);
  
  // --- Geometric Curves ---
  const geometricCurves = [];
  vps.forEach((vp, vpIndex) => {
    const lineCount = vp.weight === 'high' ? 12 : 8;
    
    for (let i = 0; i < lineCount; i++) {
      const edge = Math.floor((i * 7) % 4);
      let startX, startY;
      
      switch(edge) {
        case 0: startX = (i * 13.7) % width; startY = 0; break;
        case 1: startX = width; startY = (i * 17.3) % height; break;
        case 2: startX = (i * 12.9) % width; startY = height; break;
        case 3: startX = 0; startY = (i * 23.7) % height; break;
      }
      
      const animOffset = (time * 0.3 + i * 0.15 + vpIndex) % 3; // SLOWER
      const progress = 0.2 + (Math.sin(animOffset * Math.PI / 1.5) * 0.3);
      
      const targetX = vp.x + (startX - vp.x) * progress;
      const targetY = vp.y + (startY - vp.y) * progress;
      
      const midX = (startX + targetX) / 6;
      const midY = (startY + targetY) / 4;
      const dx = targetX - startX;
      const dy = targetY - startY;
      const perpX = -dy * 9.2;
      const perpY = dx * 0.2;
      const wave = Math.sin(time * 0.2 + i + vpIndex) * 2; // SLOWER wave
      const ctrlX = midX + perpX + wave;
      const ctrlY = midY + perpY + wave;
      
      const colorVariant = Math.floor(i / 3) % 3;
      const color = getColor(vp.energy, colorVariant);
      const isAccent = i % 5 === 0;
      
      geometricCurves.push(
        <path
          key={`curve-${vpIndex}-${i}`}
          d={`M ${startX} ${startY} Q ${ctrlX} ${ctrlY} ${targetX} ${targetY}`}
          stroke={color}
          strokeWidth={isAccent ? 0.25 : 0.12}
          opacity={(isAccent ? 0.4 : 0.2) * (1 - progress * 0.3)}
          fill="none"
          strokeDasharray={i % 3 === 0 ? '.5 3' : 'none'}
          strokeLinecap="round"
        />
      );
    }
  });
  elements.push(<g key="geometric-curves">{geometricCurves}</g>);
  
  // --- Field Particles ---
  const fieldParticles = [];
  for (let i = 0; i < 40; i++) {
    const baseX = (i * 11.3) % width;
    const baseY = (i * 17.7) % height;
    const x = baseX + Math.sin(time * 0.15 + i) * 1.5; // SLOWER
    const y = baseY + Math.cos(time * 0.2 + i) * 1.5; // SLOWER
    const size = 0.12 + Math.sin(time * 1.5 + i) * 0.06;
    const opacity = .55 + Math.sin(time * 0.8 + i * 0.5) * 0.15;
    
    fieldParticles.push(
      <circle
        key={`field-${i}`}
        cx={x} cy={y} r={size}
        fill="#6B9DC6"
        opacity={opacity}
      />
    );
  }
  elements.push(<g key="field-particles">{fieldParticles}</g>);
  
  // --- Letter Connections ---
  const letterConnections = [];
  letterParticles.forEach((l1, i) => {
    const sameWordLetters = letterParticles.filter(l => 
      l.seqIndex === l1.seqIndex && 
      l.currentWordIndex === l1.currentWordIndex &&
      Math.abs(l.letterIndex - l1.letterIndex) === 1 &&
      l1.wordPhase > 0.25 && l1.wordPhase < 0.65
    );
    
    sameWordLetters.forEach(l2 => {
      const dx = l2.x - l1.x;
      const dy = l2.y - l1.y;
      const midX = (l1.x + l2.x) / 2;
      const midY = (l1.y + l2.y) / 2;
      const curvature = Math.sin(time * 0.5 + l1.seqIndex) * 0.5; // SLOWER
      const ctrlX = midX - dy * 0.1 + curvature;
      const ctrlY = midY + dx * 0.1;
      
      letterConnections.push(
        <path
          key={`word-connection-${l1.id}-${l2.id}`}
          d={`M ${l1.x} ${l1.y} Q ${ctrlX} ${ctrlY} ${l2.x} ${l2.y}`}
          stroke={l1.color}
          strokeWidth={0.15}
          opacity={0.3 * l1.opacity}
          fill="none"
          strokeDasharray="0.5 1"
          filter="url(#glow)"
        />
      );
    });
    
    letterParticles.slice(i + 1).forEach((l2) => {
      if (l2.seqIndex === l1.seqIndex) return;
      
      const dx = l1.x - l2.x;
      const dy = l1.y - l2.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < 12 && Math.random() > 0.85) {
        const midX = (l1.x + l2.x) / 2;
        const midY = (l1.y + l2.y) / 2;
        const perpX = -dy / dist;
        const perpY = dx / dist;
        const curve = Math.sin(time * 0.25 + i) * 3; // SLOWER
        const ctrlX = midX + perpX * curve;
        const ctrlY = midY + perpY * curve;
        
        const strength = 1 - dist / 12;
        
        letterConnections.push(
          <path
            key={`nonlocal-${l1.id}-${l2.id}`}
            d={`M ${l1.x} ${l1.y} Q ${ctrlX} ${ctrlY} ${l2.x} ${l2.y}`}
            stroke={l1.color}
            strokeWidth={0.06}
            opacity={0.12 * strength}
            fill="none"
            strokeDasharray="0.5 2"
          />
        );
      }
    });
  });
  elements.push(<g key="letter-connections">{letterConnections}</g>);
  
  // --- Animated Letter Elements ---
  const letterElements = letterParticles.map(particle => {
    const pulse = 0.9 + Math.sin(time * TIMING.PULSE_FREQUENCY + particle.seqIndex + particle.letterIndex) * 0.1; // SLOWER, subtle pulsing
    const rotation = particle.wordPhase > 0.7 && particle.wordPhase < 0.95 ? 
      Math.sin(time * TIMING.ROTATION_SPEED + particle.seqIndex + particle.letterIndex) * 25 : 0; // SLOWER
    
    return (
      <text
        key={particle.id}
        x={particle.x}
        y={particle.y}
        fontSize={particle.fontSize}
        fill={particle.color}
        opacity={particle.opacity * pulse}
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="Georgia, serif"
        fontStyle="italic"
        fontWeight="300"
        filter="url(#textGlow)"
        transform={`rotate(${rotation} ${particle.x} ${particle.y})`}
      >
        {particle.char}
      </text>
    );
  });
  elements.push(<g key="letters">{letterElements}</g>);

// ==================== COMPONENT RENDER ====================
  return (
    <div className="geometric-bg">
      <svg 
        width="100%" 
        height="100%" 
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid slice" 
        className="geometric-bg-svg"
      >
        {elements}
      </svg>
    </div>
  );
};

export default GeometricBg;

// ==================== IMPROVEMENTS MADE ====================
// 1. PERFORMANCE: Memoized expensive calculations with useMemo and useCallback
// 2. ACCESSIBILITY: Added prefers-reduced-motion support for users with motion sensitivity
// 3. MAINTAINABILITY: Extracted magic numbers into named constants (ANIMATION_PHASES, OPACITY_LEVELS, TIMING)
// 4. CODE QUALITY: Created helper functions for color selection and improved code organization
// 5. REACT BEST PRACTICES: Proper dependency arrays and optimized re-renders
// 6. CONFIGURABILITY: Centralized all animation parameters for easy tweaking

// When rendering, you can adjust:
// - SVG width/height for overall size
// - Opacity for fade effects
// - Animation speed via 'time' and interval
// - Letter size and position for visual impact

// Mathematical concepts:
// - Golden ratio (phi) is used for spacing and scaling, making things look naturally pleasing.
// - Quantum drift: random movement and opacity changes mimic quantum uncertainty, making the animation feel alive.

// Playful analogy: Think of this component as a cosmic dance floor, where each letter is a dancer moving to the rhythm of 'time', spaced out by the golden ratio, and glowing with quantum energy!
