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
  // useEffect is like setting up a timer and a resize sensor. It runs after the component mounts.
  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleMotionPreferenceChange = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleMotionPreferenceChange);
    
    // This function updates the canvas size. Tweak width/height for different effects.
    const updateDimensions = () => {
      setDimensions({
        width: 120, // Visual control: change for wider/narrower background
        height: 80  // Visual control: change for taller/shorter background (was 60)
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
  // THE GOLDEN RATIO OF PHI - used for harmonious spacing. Nature's secret recipe for beauty/symmetry.
  const phi = 1.618033988749;
  
  // Animation phase constants for better maintainability
  const ANIMATION_PHASES = {
    FORMATION: 0.3,
    STABLE: 0.6,
    DISPERSION: 0.75,
    CHAOS: 1.0
  };
  
  // ⬆️ ENHANCED: More dramatic opacity ranges for visual impact
  const OPACITY_LEVELS = {
    FORMATION_START: 0.15,       // Start subtle
    FORMATION_RANGE: 0.35,       // Range for effect
    STABLE: 0.50,                // More visible when stable
    DISPERSION_MULTIPLIER: 0.45, // Fade on dispersion
    CHAOS_BASE: 0.12,            // Ghostly during chaos
    CHAOS_RANGE: 0.18,
    ECHO_MULTIPLIER: 0.15,       // For trail effects
  };
  
  // ⬇️ ENHANCED: Slower, more hypnotic timing
  const TIMING = {
    ANIMATION_INTERVAL: 25,      // Smoother framerate
    TIME_INCREMENT: 0.006,       // Slower, more meditative
    PULSE_FREQUENCY: 0,          // No pulsing
    ROTATION_SPEED: 2.5,         // Softer rotation
    CHAOS_X_SPEED: 0.4,          // Chaos movement speed
    CHAOS_Y_SPEED: 0.3,          // Chaos movement speed
  };
  
  // Vanishing points for geometric curves - positioned using golden ratio
  const vps = [
    { x: width / phi, y: height / phi, weight: 'high', energy: 'cerebral' },
    { x: width - width / phi, y: height - height / phi, weight: 'high', energy: 'emotion' },
    { x: width / phi, y: height - height / phi, weight: 'medium', energy: 'structure' },
    { x: width - width / phi, y: height / phi, weight: 'medium', energy: 'dynamic' },
  ];
  
  // Color palettes organized by energy type
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
  
  // ⬆️ NEW: Helper function to determine word personality/type
  const getWordPersonality = useCallback((word) => {
    if (!word) return 'standard';
    if (word.length > 10) return 'philosophical'; // hypnagogia, Individuation
    if (/[\u4E00-\u9FFF]/.test(word)) return 'ideographic'; // Chinese characters
    if (['wu-wei', 'escalofrío', 'susurro', 'pneuma', 'psithurism', 'numinous', 'selcouth'].includes(word.toLowerCase())) {
      return 'mystical';
    }
    return 'standard';
  }, []);
  
  // Rich multilingual word sequences
  const wordSequences = useMemo(() => [
    ['quiet', 'storm', 'escalofrío'], 
    ['lost', 'ethereal'], 
    ['龙', '詩','物','理'],
    ['time', 'EMBODY', 'flow'],
    ['word', 'echo', 'silence'], 
    ['dream', 'innovation', 'liminal'], 
    ['hypnagogia', 'threshold', 'sub-conscious'],
    ['light', 'shadow', 'halcyon', 'night'],
    ['space', 'void', 'peace', 'equanimity'], 
    ['Catalina', 'dispersion', 'chaos'], 
    ['fade', 'emergence', 'Clara','liminal', 'pneuma'],
    ['pages', 'verses', 'sage'], 
    ['voice', 'whisper','susurro', 'choice', 'pensamiento'], 
    ['flow', 'osmosis', 'glow'],
    ['world', 'cosmos', 'qualia', 'infinite'], 
    ['dance', 'numinous', 'trance'], 
    ['story', 'myth', 'glory', 'legend'],
    ['breathe', 'psithurism', 'believe'], 
    ['wander', 'wonder', 'wu-wei', 'selcouth'], 
    ['begin', 'end', 'again'],
    ['Individuation','respira','despierta','sueña','revela']
  ], []);
  
  // MORE DRAMATIC size variations per word sequence
  const sequenceSizes = useMemo(() => {
    const fastProportion = 1 - (1 / phi); // Proportion of words that should be fast, based on golden ratio

    return wordSequences.map(() => {
      const isFast = Math.random() < fastProportion;
      return {
        fontSize: 1.1 + Math.random() * 2.3, // Increased base size for legibility
        letterSpacing: 1.5 + Math.random() * 3,
        speedMultiplier: isFast 
          ? 1.0 + Math.random() * 0.5  // Fast range (e.g., 1.0 to 1.5)
          : 0.3 + Math.random() * 0.4, // Slow range (e.g., 0.3 to 0.7)
        isDynamic: Math.random() > 0.5, // Randomly decide if a word sequence should be dynamic (pulsate and resize)
      };
    });
  }, [wordSequences, phi]);
  
// ==================== ANIMATION LOGIC ====================
  // ⬆️ ENHANCED: More sophisticated letter particle system with word personalities
  const getLetterStates = () => {
    const particles = [];
    
    wordSequences.forEach((sequence, seqIndex) => {
      const numWords = sequence.length;
      const { speedMultiplier } = sequenceSizes[seqIndex];
      const cycleTime = (12 + numWords * 3) / speedMultiplier;
      const seqTime = (time + seqIndex * 1) % cycleTime;
      const phase = seqTime / cycleTime;

      const wordDuration = 1 / numWords;
      const currentWordIndex = Math.floor(phase / wordDuration);
      const nextWordIndex = (currentWordIndex + 1) % numWords;
      const wordPhase = (phase % wordDuration) / wordDuration;

      // Calculate base position using golden ratio
      const baseAngle = (seqIndex / wordSequences.length) * Math.PI * 2;
      const baseRadius = 30 + (seqIndex % 3) * 2;
      const centerX = width / 2 + Math.cos(baseAngle) * baseRadius;
      const centerY = height / 2 + Math.sin(baseAngle) * baseRadius;

      // Quantum drift for organic movement
      const driftX = Math.sin(time * 0.05 + seqIndex) * 2;
      const driftY = Math.cos(time * 0.07 + seqIndex) * 2;

      const currentWord = sequence[currentWordIndex];
      const nextWord = sequence[nextWordIndex];
      const maxLen = Math.max(currentWord.length, nextWord.length);
      const { fontSize, letterSpacing, isDynamic } = sequenceSizes[seqIndex];
      
      // ⬆️ NEW: Get word personality for specialized behavior
      const currentPersonality = getWordPersonality(currentWord);

      for (let letterIndex = 0; letterIndex < maxLen; letterIndex++) {
        const currentChar = currentWord[letterIndex] || '';
        const nextChar = nextWord[letterIndex] || '';
        
        // Base letter size variation - only apply if the word is dynamic
        const letterSizeVariation = isDynamic ? 0.7 + Math.random() * 0.6 : 1.0;
        
        // ⬆️ NEW: Adjust size based on character type and word personality
        let sizeMultiplier = 1;
        if (currentWord.length > 12) sizeMultiplier = 0.8; // Smaller for long words
        if (/[\u4E00-\u9FFF]/.test(currentChar)) sizeMultiplier = 1.3; // Bigger for Chinese
        if (currentPersonality === 'mystical') sizeMultiplier *= 1.1; // Slightly larger for mystical words
        
        const letterFontSize = fontSize * letterSizeVariation * sizeMultiplier;

        let x, y, opacity, char;
        const currentWordWidth = (currentWord.length - 1) * letterSpacing / 2;
        const nextWordWidth = (nextWord.length - 1) * letterSpacing / 2;

        if (wordPhase < ANIMATION_PHASES.FORMATION) {
          // Formation phase - letters fly in
          const progress = wordPhase / ANIMATION_PHASES.FORMATION;
          const eased = 1 - Math.pow(1 - progress, 3);
          
          const targetX = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          const targetY = centerY + driftY;
          
          const startAngle = (letterIndex + seqIndex + currentWordIndex) * 0.8;
          const startX = targetX + Math.cos(startAngle) * 30 * (1 - eased);
          const startY = targetY + Math.sin(startAngle) * 50 * (1 - eased);
          
          x = startX;
          y = startY;
          opacity = OPACITY_LEVELS.FORMATION_START + eased * OPACITY_LEVELS.FORMATION_RANGE;
          char = currentChar;
          
        } else if (wordPhase < ANIMATION_PHASES.STABLE) {
          // Stable phase - letters sit in place
          x = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          y = centerY + driftY;
          opacity = OPACITY_LEVELS.STABLE;
          char = currentChar;
          
          // ⬆️ NEW: Add echo/trail effect for mystical words
          if (currentPersonality === 'mystical' && Math.random() > 0.7) {
            particles.push({
              id: `${seqIndex}-${currentWordIndex}-${letterIndex}-echo`,
              char: currentChar,
              x: x + Math.sin(time + letterIndex) * 0.5,
              y: y + Math.cos(time + letterIndex) * 0.5,
              opacity: OPACITY_LEVELS.STABLE * OPACITY_LEVELS.ECHO_MULTIPLIER,
              seqIndex,
              currentWordIndex,
              letterIndex,
              wordPhase,
              fontSize: letterFontSize * 1.15,
              color: getLetterColor(seqIndex)
            });
          }
          
        } else if (wordPhase < ANIMATION_PHASES.DISPERSION) {
          // ⬆️ ENHANCED: Circular dispersion pattern with velocity based on font size
          const progress = (wordPhase - ANIMATION_PHASES.STABLE) / (ANIMATION_PHASES.DISPERSION - ANIMATION_PHASES.STABLE);
          const eased = Math.pow(progress, 2);
          
          const startX = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          const startY = centerY + driftY;

          // Velocity Enhancement: Smaller words move faster.
          // We establish a base radius and then amplify it for smaller font sizes.
          const baseDisperseRadius = 15;
          // Create a multiplier that is larger for smaller fonts.
          // The value '2.0' is a good average font size. Fonts smaller than this get a velocity boost.
          const velocityFactor = Math.max(0.5, 2.0 / fontSize);
          
          // Perfect circular dispersion - each letter evenly spaced around circle
          const totalLetters = currentWord.length;
          const disperseAngle = (letterIndex / totalLetters) * Math.PI * 2 + (time * 0.2);
          // Apply the velocity factor to the radius.
          const disperseRadius = baseDisperseRadius * velocityFactor * eased;
          
          x = startX + Math.cos(disperseAngle) * disperseRadius;
          y = startY + Math.sin(disperseAngle) * disperseRadius;
          opacity = OPACITY_LEVELS.DISPERSION_MULTIPLIER * (1 - eased);
          char = currentChar;
          
        } else {
          // ⬆️ ENHANCED: Chaos phase with pulsing radius and smoother transition
          const progress = (wordPhase - ANIMATION_PHASES.DISPERSION) / (ANIMATION_PHASES.CHAOS - ANIMATION_PHASES.DISPERSION);
          const midProgress = Math.sin(progress * Math.PI);
          
          // Pulsing chaos radius for more dynamic movement
          const chaosRadius = 10 + Math.sin(time * 0.5 + letterIndex) * 5;
          
          if (progress < 0.5) {
            // First half of chaos - current character
            const chaosX = centerX + driftX + Math.sin(time * TIMING.CHAOS_X_SPEED + letterIndex + seqIndex) * chaosRadius;
            const chaosY = centerY + driftY + Math.cos(time * TIMING.CHAOS_Y_SPEED + letterIndex + seqIndex) * chaosRadius;
            x = chaosX;
            y = chaosY;
            opacity = OPACITY_LEVELS.CHAOS_BASE + midProgress * OPACITY_LEVELS.CHAOS_RANGE;
            char = currentChar;
          } else {
            // Second half - morph to next character
            const chaosX = centerX + driftX + (letterIndex * letterSpacing - nextWordWidth) + 
                          Math.sin(time * TIMING.CHAOS_X_SPEED + letterIndex + seqIndex) * chaosRadius;
            const chaosY = centerY + driftY + 
                          Math.cos(time * TIMING.CHAOS_Y_SPEED + letterIndex + seqIndex) * chaosRadius;
            x = chaosX;
            y = chaosY;
            opacity = OPACITY_LEVELS.CHAOS_BASE + midProgress * OPACITY_LEVELS.CHAOS_RANGE;
            char = nextChar;
          }
        }
        
        // Only add visible letters
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
            color: getLetterColor(seqIndex),
            personality: currentPersonality // Store for potential use
          });
        }
      }
    });
    
    return particles;
  };
  
  // Memoize expensive letter state calculations
  const letterParticles = useMemo(() => getLetterStates(), [time, wordSequences, sequenceSizes, width, height, getWordPersonality, getLetterColor]);
  
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
        strokeWidth="0.08"
        opacity="0.08"
        strokeDasharray="3 6"
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
        opacity="0.08"
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
      
      const animOffset = (time * 0.3 + i * 0.15 + vpIndex) % 3;
      const progress = 0.2 + (Math.sin(animOffset * Math.PI / 1.5) * 0.3);
      
      const targetX = vp.x + (startX - vp.x) * progress;
      const targetY = vp.y + (startY - vp.y) * progress;
      
      const midX = (startX + targetX) / 6;
      const midY = (startY + targetY) / 4;
      const dx = targetX - startX;
      const dy = targetY - startY;
      const perpX = -dy * 2.2;
      const perpY = dx * 0.2;
      const wave = Math.sin(time * 0.2 + i + vpIndex) * 2;
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
          opacity={(isAccent ? 0.25 : 0.12) * (1 - progress * 0.3)}
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
    const x = baseX + Math.sin(time * 0.15 + i) * 1.5;
    const y = baseY + Math.cos(time * 0.2 + i) * 1.5;
    const size = 0.12 + Math.sin(time * 1.5 + i) * 0.06;
    const opacity = .35 + Math.sin(time * 0.8 + i * 0.5) * 0.10;
    
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
  // ⬆️ ENHANCED: More visible quantum entanglement connections
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
      const curvature = Math.sin(time * 0.5 + l1.seqIndex) * 0.5;
      const ctrlX = midX - dy * 0.1 + curvature;
      const ctrlY = midY + dx * 0.1;
      
      letterConnections.push(
        <path
          key={`word-connection-${l1.id}-${l2.id}`}
          d={`M ${l1.x} ${l1.y} Q ${ctrlX} ${ctrlY} ${l2.x} ${l2.y}`}
          stroke={l1.color}
          strokeWidth={0.2}
          opacity={0.25 * l1.opacity}
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
        const curve = Math.sin(time * 0.25 + i) * 3;
        const ctrlX = midX + perpX * curve;
        const ctrlY = midY + perpY * curve;
        
        const strength = 1 - dist / 12;
        
        letterConnections.push(
          <path
            key={`nonlocal-${l1.id}-${l2.id}`}
            d={`M ${l1.x} ${l1.y} Q ${ctrlX} ${ctrlY} ${l2.x} ${l2.y}`}
            stroke={l1.color}
            strokeWidth={0.06}
            opacity={0.08 * strength}
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
    const isDynamic = sequenceSizes[particle.seqIndex].isDynamic;
    const pulse = isDynamic ? 0.9 + Math.sin(time * TIMING.PULSE_FREQUENCY + particle.seqIndex + particle.letterIndex) * 0.1 : 1.0;
    const rotation = particle.wordPhase > 0.7 && particle.wordPhase < 0.95 ? 
      Math.sin(time * TIMING.ROTATION_SPEED + particle.seqIndex + particle.letterIndex) * 25 : 0;
    
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