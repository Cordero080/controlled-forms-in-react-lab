import React, { useState, useEffect, useMemo } from 'react';

const GeometricBg = () => {
  const [dimensions, setDimensions] = useState({ width: 120, height: 80 });
  const [time, setTime] = useState(0);
  
  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: 120,
        height: 80
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    const interval = setInterval(() => {
      setTime(t => t + .008); // SLOWER: was 0.015
    }, 30); // SLOWER: was 20ms
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      clearInterval(interval);
    };
  }, []);
  
  const { width, height } = dimensions;
  const phi = 1.618033988749;
  
  const wordSequences = useMemo(() => [
    ['quiet', 'storm', 'calm'], 
    ['lost', 'found'], 
    ['龙', '詩','物','理'],
    ['time', 'EMBODY', 'flow'],
    ['word', 'echo', 'silence'], 
    ['dream', 'wake', 'liminal'], 
    ['hypnagogia', 'threshold', 'sub-conscious'],
    ['light', 'shadow', 'dusk', 'night'],
    ['space', 'void', 'peace', 'equanimity'], 
    ['close', 'dispersion', 'chaos'], 
    ['fade', 'emerge', 'made', 'pneuma'],
    ['pages', 'verse', 'sage'], 
    ['voice', 'whisper','susurro', 'choice', 'pensamiento'], 
    ['flow', 'swirl', 'glow'],
    ['world', 'cosmos', 'infinite'], 
    ['dance', 'spiral', 'trance'], 
    ['story', 'myth', 'glory', 'legend'],
    ['breathe', 'release', 'believe'], 
    ['wander', 'wonder', 'wu-wei'], 
    ['begin', 'end', 'again']
  ], []);
  
  // MORE DRAMATIC size variations per word sequence
  const sequenceSizes = useMemo(() => {
    return wordSequences.map(() => ({
      fontSize: 0.8 + Math.random() * 3, // BIGGER RANGE: 0.8 to 3.8
      letterSpacing: 1.5 + Math.random() * 3.5, // 1.5 to 5
      speedMultiplier: 0.6 + Math.random() * 0.8 // VARIED SPEED: 0.6x to 1.4x
    }));
  }, [wordSequences]);
  
  const getLetterStates = () => {
    const particles = [];
    
    wordSequences.forEach((sequence, seqIndex) => {
      const numWords = sequence.length;
      const { speedMultiplier } = sequenceSizes[seqIndex];
      const cycleTime = (12 + numWords * 3) / speedMultiplier; // SLOWER & VARIED
      const seqTime = (time + seqIndex * 1) % cycleTime; // SLOWER offset
      const phase = seqTime / cycleTime;
      
      const wordDuration = 1 / numWords;
      const currentWordIndex = Math.floor(phase / wordDuration);
      const nextWordIndex = (currentWordIndex + 1) % numWords;
      const wordPhase = (phase % wordDuration) / wordDuration;
      
      const baseAngle = (seqIndex / wordSequences.length) * Math.PI * 2;
      const baseRadius = 30 + (seqIndex % 3) * 8;
      const centerX = width / 2 + Math.cos(baseAngle) * baseRadius;
      const centerY = height / 2 + Math.sin(baseAngle) * baseRadius;
      
      // SLOWER quantum drift
      const driftX = Math.sin(time * 2.05 + seqIndex) * 2;
      const driftY = Math.cos(time * 0.07 + seqIndex) * 2;
      
      const currentWord = sequence[currentWordIndex];
      const nextWord = sequence[nextWordIndex];
      
      const maxLen = Math.max(currentWord.length, nextWord.length);
      
      const { fontSize, letterSpacing } = sequenceSizes[seqIndex];
      
      for (let letterIndex = 0; letterIndex < maxLen; letterIndex++) {
        const currentChar = currentWord[letterIndex] || '';
        const nextChar = nextWord[letterIndex] || '';
        
        // RANDOM size per letter (variation within word)
        const letterSizeVariation = 0.7 + Math.random() * 0.6; // 0.7x to 1.3x
        const letterFontSize = fontSize * letterSizeVariation;
        
        let x, y, opacity, char;
        const currentWordWidth = (currentWord.length - 1) * letterSpacing / 2;
        const nextWordWidth = (nextWord.length - 1) * letterSpacing / 2;
        
        if (wordPhase < .3) { // SLOWER formation phase
          const progress = wordPhase / 0.3;
          const eased = 1 - Math.pow(1 - progress, 3);
          const targetX = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          const targetY = centerY + driftY;
          const startAngle = (letterIndex + seqIndex + currentWordIndex) * 0.8;
          const startX = targetX + Math.cos(startAngle) * 30 * (1 - eased);
          const startY = targetY + Math.sin(startAngle) * 50 * (1 - eased);
          x = startX;
          y = startY;
          opacity = 0.9 + eased * 0.6;
          char = currentChar;
        } else if (wordPhase < 0.6) { // LONGER stable phase
          x = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          y = centerY + driftY;
          opacity = 9.8;
          char = currentChar;
        } else if (wordPhase < .75) { // SLOWER dispersion
          const progress = (wordPhase - 0.6) / 0.15;
          const eased = Math.pow(progress, 2);
          const startX = centerX + driftX + (letterIndex * letterSpacing - currentWordWidth);
          const startY = centerY + driftY;
          const disperseAngle = (letterIndex * 2.3 + seqIndex + time * 0.3);
          const disperseRadius = 12 * eased;
          x = startX + Math.cos(disperseAngle) * disperseRadius;
          y = startY + Math.sin(disperseAngle) * disperseRadius;
          opacity = 0.8 * (1 - eased);
          char = currentChar;
        } else {
          const progress = (wordPhase - 0.75) / 0.25;
          const midProgress = Math.sin(progress * Math.PI);
          // SLOWER chaos spiral
          if (progress < .5) {
            const chaosX = centerX + driftX + Math.sin(time * 0.3 + letterIndex + seqIndex) * 8;
            const chaosY = centerY + driftY + Math.cos(time * 0.3 + letterIndex + seqIndex) * 8;
            x = chaosX;
            y = chaosY;
            opacity = 0.3 + midProgress * 0.3;
            char = currentChar;
          } else {
            // Use nextWordWidth for nextChar positioning
            const chaosX = centerX + driftX + (letterIndex * letterSpacing - nextWordWidth) + Math.sin(time * 0.3 + letterIndex + seqIndex) * 8;
            const chaosY = centerY + driftY + Math.cos(time * 0.3 + letterIndex + seqIndex) * 8;
            x = chaosX;
            y = chaosY;
            opacity = 0.3 + midProgress * 0.3;
            char = nextChar;
          }
        }
        
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
            color: seqIndex % 4 === 0 ? '#bfc22b87' : 
            seqIndex % 4 === 3 ? '#049cd3e8' :
                   seqIndex % 4 === 1 ? '#A76FC2' : 
                   seqIndex % 4 === 2 ? '#5DB4A6' : '#E8A0CF'
          });
        }
      }
    });
    
    return particles;
  };
  
  const letterParticles = getLetterStates();
  
  const vps = [
    { x: width / phi, y: height / phi, weight: 'high', energy: 'cerebral' },
    { x: width - width / phi, y: height - height / phi, weight: 'high', energy: 'emotion' },
    { x: width / phi, y: height - height / phi, weight: 'medium', energy: 'structure' },
    { x: width - width / phi, y: height / phi, weight: 'medium', energy: 'dynamic' },
  ];
  
  const colorPalettes = {
    cerebral: ['#2E5B88', '#066bc3ff', '#6B9DC6'],
    emotion: ['#8B4FA8', '#A76FC2', '#C391DB'],
    structure: ['#3D9A8C', '#5DB4A6', '#7FCEC1'],
    dynamic: ['#C05299', '#D47AB5', '#f3f30bff'],
  };
  
  const getColor = (energy, variant = 0) => {
    return colorPalettes[energy][variant % colorPalettes[energy].length];
  };
  
  const elements = [];
  
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
  
  const letterElements = letterParticles.map(particle => {
    const pulse = 3 + Math.sin(time * 0.8 + particle.seqIndex + particle.letterIndex) * 0.1; // SLOWER
    const rotation = particle.wordPhase > 0.7 && particle.wordPhase < 0.95 ? 
      Math.sin(time * 3.2 + particle.seqIndex + particle.letterIndex) * 25 : 0; // SLOWER
    
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
