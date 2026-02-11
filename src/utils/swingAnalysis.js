import proGolfers from '../data/proGolfers';

// Analyze user swing input and produce a full report
export function analyzeSwing(userInput) {
  const userProfile = buildUserProfile(userInput);
  const strengths = identifyStrengths(userProfile);
  const weaknesses = identifyWeaknesses(userProfile);
  const tendencies = identifyTendencies(userProfile);
  const shotShape = predictShotShape(userProfile);
  const matchedPros = findMatchingPros(userProfile);
  const recommendations = generateRecommendations(userProfile, weaknesses, userInput.goalSwing);
  const overallScore = calculateOverallScore(userProfile);

  return {
    userProfile,
    strengths,
    weaknesses,
    tendencies,
    shotShape,
    matchedPros,
    recommendations,
    overallScore,
  };
}

// Build a normalized user swing profile from form input
function buildUserProfile(input) {
  const {
    handicap,
    clubheadSpeed,
    missDirection,
    missFlight,
    tempo,
    flexibility,
    backswingLength,
    hipSlide,
    earlyExtension,
    overTheTop,
    castingRelease,
    reverseSpine,
    swayOff,
    liftUp,
    balanceFinish,
    shotShape,
  } = input;

  // Derive metrics from user inputs
  const handicapFactor = Math.max(0, Math.min(100, 100 - (handicap * 2)));
  const speedNorm = normalizeSpeed(clubheadSpeed, input.gender);

  return {
    tempo: mapTempo(tempo),
    power: speedNorm,
    accuracy: calculateAccuracy(handicapFactor, missDirection, overTheTop, castingRelease),
    consistency: calculateConsistency(handicapFactor, earlyExtension, reverseSpine),
    flexibility: mapFlexibility(flexibility),
    hipRotation: calculateHipRotation(hipSlide, earlyExtension, speedNorm),
    shoulderTurn: calculateShoulderTurn(backswingLength, flexibility),
    wristLag: calculateWristLag(castingRelease, speedNorm),
    followThrough: calculateFollowThrough(balanceFinish, reverseSpine),
    balance: calculateBalance(balanceFinish, swayOff, liftUp),
    clubSpeed: speedNorm,
    attackAngle: calculateAttackAngle(earlyExtension, overTheTop, castingRelease),
    clubPath: calculateClubPath(overTheTop, missDirection, swayOff),
    faceControl: calculateFaceControl(handicapFactor, shotShape, missDirection),
    // Raw input for additional analysis
    _input: input,
  };
}

function normalizeSpeed(speed, gender) {
  // Average male amateur ~93mph, average female amateur ~65mph
  // Tour male ~115mph, tour female ~94mph
  if (gender === 'female') {
    return Math.min(100, Math.max(20, ((speed - 40) / 55) * 100));
  }
  return Math.min(100, Math.max(20, ((speed - 60) / 60) * 100));
}

function mapTempo(tempo) {
  const tempoMap = { slow: 70, moderate: 85, fast: 60, veryFast: 45 };
  return tempoMap[tempo] || 70;
}

function mapFlexibility(flex) {
  const flexMap = { limited: 40, average: 60, good: 78, excellent: 93 };
  return flexMap[flex] || 60;
}

function calculateAccuracy(handicapFactor, missDirection, overTheTop, casting) {
  let score = handicapFactor;
  if (missDirection === 'both') score -= 10;
  if (overTheTop === 'severe') score -= 15;
  else if (overTheTop === 'mild') score -= 5;
  if (casting === 'yes') score -= 8;
  return Math.max(15, Math.min(100, score));
}

function calculateConsistency(handicapFactor, earlyExtension, reverseSpine) {
  let score = handicapFactor;
  if (earlyExtension === 'yes') score -= 10;
  if (reverseSpine === 'yes') score -= 12;
  return Math.max(15, Math.min(100, score));
}

function calculateHipRotation(hipSlide, earlyExtension, speed) {
  let score = speed * 0.6 + 30;
  if (hipSlide === 'yes') score -= 15;
  if (earlyExtension === 'yes') score -= 10;
  return Math.max(15, Math.min(100, score));
}

function calculateShoulderTurn(backswingLength, flexibility) {
  const lengthMap = { short: 50, threeQuarter: 70, full: 85, past: 78 };
  const flexMap = { limited: -10, average: 0, good: 8, excellent: 15 };
  return Math.max(15, Math.min(100, (lengthMap[backswingLength] || 70) + (flexMap[flexibility] || 0)));
}

function calculateWristLag(casting, speed) {
  let score = speed * 0.5 + 35;
  if (casting === 'yes') score -= 25;
  else if (casting === 'sometimes') score -= 10;
  return Math.max(15, Math.min(100, score));
}

function calculateFollowThrough(balanceFinish, reverseSpine) {
  const balMap = { falling: 35, stumble: 50, stable: 75, held: 92 };
  let score = balMap[balanceFinish] || 60;
  if (reverseSpine === 'yes') score -= 12;
  return Math.max(15, Math.min(100, score));
}

function calculateBalance(balanceFinish, swayOff, liftUp) {
  const balMap = { falling: 30, stumble: 48, stable: 75, held: 93 };
  let score = balMap[balanceFinish] || 60;
  if (swayOff === 'yes') score -= 12;
  if (liftUp === 'yes') score -= 8;
  return Math.max(15, Math.min(100, score));
}

function calculateAttackAngle(earlyExtension, overTheTop, casting) {
  let score = 78;
  if (earlyExtension === 'yes') score -= 12;
  if (overTheTop === 'severe') score -= 18;
  else if (overTheTop === 'mild') score -= 8;
  if (casting === 'yes') score -= 10;
  return Math.max(15, Math.min(100, score));
}

function calculateClubPath(overTheTop, missDirection, swayOff) {
  let score = 80;
  if (overTheTop === 'severe') score -= 25;
  else if (overTheTop === 'mild') score -= 10;
  if (missDirection === 'both') score -= 10;
  if (swayOff === 'yes') score -= 8;
  return Math.max(15, Math.min(100, score));
}

function calculateFaceControl(handicapFactor, shotShape, missDirection) {
  let score = handicapFactor * 0.7 + 20;
  if (shotShape === 'straight') score += 5;
  if (missDirection === 'consistent') score += 5;
  return Math.max(15, Math.min(100, score));
}

// Identify user's top strengths
function identifyStrengths(profile) {
  const metrics = Object.entries(profile)
    .filter(([key]) => !key.startsWith('_'))
    .sort((a, b) => b[1] - a[1]);

  const strengths = [];
  const labels = {
    tempo: { high: 'Smooth, controlled tempo', label: 'Tempo' },
    power: { high: 'Strong power generation', label: 'Power' },
    accuracy: { high: 'Consistent directional control', label: 'Accuracy' },
    consistency: { high: 'Reliable shot-to-shot consistency', label: 'Consistency' },
    flexibility: { high: 'Great flexibility enables full range of motion', label: 'Flexibility' },
    hipRotation: { high: 'Strong hip rotation for power', label: 'Hip Rotation' },
    shoulderTurn: { high: 'Full shoulder turn for width and power', label: 'Shoulder Turn' },
    wristLag: { high: 'Good wrist lag for power storage', label: 'Wrist Lag' },
    followThrough: { high: 'Complete, balanced follow-through', label: 'Follow Through' },
    balance: { high: 'Excellent balance throughout the swing', label: 'Balance' },
    clubSpeed: { high: 'Above-average clubhead speed', label: 'Club Speed' },
    attackAngle: { high: 'Proper angle of attack', label: 'Attack Angle' },
    clubPath: { high: 'On-plane club path', label: 'Club Path' },
    faceControl: { high: 'Good clubface control at impact', label: 'Face Control' },
  };

  for (const [key, value] of metrics.slice(0, 4)) {
    if (value >= 60 && labels[key]) {
      strengths.push({
        metric: key,
        label: labels[key].label,
        description: labels[key].high,
        score: value,
      });
    }
  }

  return strengths;
}

// Identify weaknesses
function identifyWeaknesses(profile) {
  const metrics = Object.entries(profile)
    .filter(([key]) => !key.startsWith('_'))
    .sort((a, b) => a[1] - b[1]);

  const weaknessDescriptions = {
    tempo: 'Tempo is too fast or inconsistent — leads to mis-hits and timing issues',
    power: 'Lacking power — consider improving rotation and ground forces',
    accuracy: 'Directional control needs work — focus on face-to-path relationship',
    consistency: 'Shot consistency is low — work on fundamentals and repeatable positions',
    flexibility: 'Limited flexibility restricts turn — stretching and mobility work will help',
    hipRotation: 'Insufficient hip rotation — losing power and creating compensations',
    shoulderTurn: 'Incomplete shoulder turn — reduces power potential and coil',
    wristLag: 'Losing wrist lag early (casting) — major power leak',
    followThrough: 'Incomplete follow-through — indicates deceleration or balance issues',
    balance: 'Poor balance — foundation issue that affects every other part of the swing',
    clubSpeed: 'Below-average club speed — work on sequencing and strength',
    attackAngle: 'Inconsistent attack angle — leads to fat/thin shots',
    clubPath: 'Club path issues — primary cause of directional misses',
    faceControl: 'Poor face control — leads to unpredictable shot shapes',
  };

  const weaknesses = [];
  for (const [key, value] of metrics.slice(0, 4)) {
    if (value < 75 && weaknessDescriptions[key]) {
      weaknesses.push({
        metric: key,
        label: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
        description: weaknessDescriptions[key],
        score: value,
        severity: value < 40 ? 'major' : value < 60 ? 'moderate' : 'minor',
      });
    }
  }

  return weaknesses;
}

// Identify swing tendencies (what the swing typically produces)
function identifyTendencies(profile) {
  const input = profile._input;
  const tendencies = { good: [], bad: [] };

  // Good tendencies
  if (profile.power >= 75) tendencies.good.push('Can reach par 5s in two with mid-irons');
  if (profile.accuracy >= 75) tendencies.good.push('Hits a high percentage of fairways and greens');
  if (profile.tempo >= 80) tendencies.good.push('Smooth tempo leads to solid contact');
  if (profile.balance >= 80) tendencies.good.push('Good balance enables consistent ball-striking');
  if (profile.wristLag >= 75) tendencies.good.push('Good lag produces penetrating ball flight');
  if (profile.faceControl >= 80) tendencies.good.push('Predictable shot shape you can depend on');
  if (profile.consistency >= 80) tendencies.good.push('Few blow-up holes — steady scoring');
  if (profile.hipRotation >= 80) tendencies.good.push('Strong rotation powers the swing efficiently');

  // Bad tendencies based on faults
  if (input.overTheTop === 'severe') {
    tendencies.bad.push('Over-the-top move causes pulls and slices');
    tendencies.bad.push('Steep divots that dig too deep, especially with irons');
  } else if (input.overTheTop === 'mild') {
    tendencies.bad.push('Slight outside-in path can produce weak fades/pulls');
  }

  if (input.earlyExtension === 'yes') {
    tendencies.bad.push('Early extension causes inconsistent low point — fat and thin shots');
    tendencies.bad.push('Tends to get blocked and flip through impact');
  }

  if (input.castingRelease === 'yes') {
    tendencies.bad.push('Casting leaks significant power — 10-20 yards less than potential');
    tendencies.bad.push('High, weak ball flight that doesn\'t hold in wind');
  }

  if (input.reverseSpine === 'yes') {
    tendencies.bad.push('Reverse spine angle risks back injury over time');
    tendencies.bad.push('Inconsistent strike location on the clubface');
  }

  if (input.swayOff === 'yes') {
    tendencies.bad.push('Lateral sway makes it hard to return to the ball consistently');
  }

  if (input.hipSlide === 'yes') {
    tendencies.bad.push('Hip slide instead of rotation loses power and can cause blocks');
  }

  if (input.balanceFinish === 'falling' || input.balanceFinish === 'stumble') {
    tendencies.bad.push('Loss of balance indicates swing is out of control');
  }

  if (input.missDirection === 'both') {
    tendencies.bad.push('Two-way miss makes course management very difficult');
  }

  if (tendencies.good.length === 0) {
    tendencies.good.push('Room for big improvement — even small changes will show results');
  }
  if (tendencies.bad.length === 0) {
    tendencies.bad.push('No major swing faults detected — focus on fine-tuning');
  }

  return tendencies;
}

// Predict likely shot shape
function predictShotShape(profile) {
  const input = profile._input;
  let shape = input.shotShape || 'varies';
  let flight = 'mid';
  let spin = 'normal';

  if (input.overTheTop === 'severe') {
    shape = input.missFlight === 'slice' ? 'slice' : 'pull';
    flight = 'high';
    spin = 'high';
  } else if (input.overTheTop === 'mild') {
    shape = 'fade';
    flight = 'mid-high';
  }

  if (input.castingRelease === 'yes') {
    flight = 'high';
    spin = 'high';
  }

  if (profile.clubPath >= 80 && profile.faceControl >= 80) {
    spin = 'optimal';
  }

  return {
    shape,
    flight,
    spin,
    description: getShotShapeDescription(shape, flight, spin),
  };
}

function getShotShapeDescription(shape, flight, spin) {
  const shapeText = {
    straight: 'a relatively straight ball flight',
    fade: 'a left-to-right fade (for right-handed golfers)',
    draw: 'a right-to-left draw (for right-handed golfers)',
    slice: 'a pronounced left-to-right slice that loses distance',
    hook: 'a right-to-left hook that can be hard to control',
    pull: 'a straight pull to the left of target',
    push: 'a straight push to the right of target',
    varies: 'an unpredictable shot shape that varies',
  };

  return `Your swing typically produces ${shapeText[shape] || 'a variable shot shape'} with a ${flight} trajectory and ${spin} spin rate.`;
}

// Find pro golfers whose swing most closely matches the user
export function findMatchingPros(userProfile, count = 3) {
  const scored = proGolfers.map(pro => {
    let totalDiff = 0;
    let metricCount = 0;

    for (const [key, value] of Object.entries(pro.swingProfile)) {
      if (userProfile[key] !== undefined) {
        totalDiff += Math.abs(userProfile[key] - value);
        metricCount++;
      }
    }

    const avgDiff = metricCount > 0 ? totalDiff / metricCount : 100;
    const similarity = Math.max(0, 100 - avgDiff);

    return { ...pro, similarity, avgDiff };
  });

  // Filter by gender if specified
  const gender = userProfile._input?.gender;
  const filtered = gender
    ? scored.filter(p => p.gender === gender)
    : scored;

  return filtered.sort((a, b) => b.similarity - a.similarity).slice(0, count);
}

// Generate recommendations for improving toward goal swing
export function generateRecommendations(userProfile, weaknesses, goalSwingType) {
  const recommendations = [];
  const priority = { major: 1, moderate: 2, minor: 3 };

  // Address weaknesses by severity
  const sortedWeaknesses = [...weaknesses].sort(
    (a, b) => (priority[a.severity] || 3) - (priority[b.severity] || 3)
  );

  const drillLibrary = {
    tempo: {
      title: 'Improve Swing Tempo',
      drills: [
        'Practice with a metronome app — aim for a 3:1 backswing-to-downswing ratio',
        'Hit balls at 50% speed, focusing on rhythm',
        'Use the "swoosh" drill with an upside-down club',
      ],
    },
    power: {
      title: 'Increase Power',
      drills: [
        'Medicine ball rotational throws to build golf-specific power',
        'Practice speed training with SuperSpeed-style protocols',
        'Focus on ground reaction forces — push and rotate through the ball',
      ],
    },
    accuracy: {
      title: 'Improve Accuracy',
      drills: [
        'Alignment stick drills for setup and path',
        'Gate drill with tees placed around the ball',
        'Half-swing punch shots focusing on face control',
      ],
    },
    consistency: {
      title: 'Build Consistency',
      drills: [
        'Block practice with the same club, same target for 30 balls',
        'Pre-shot routine practice on every range ball',
        'Impact bag drills for consistent delivery position',
      ],
    },
    flexibility: {
      title: 'Improve Flexibility',
      drills: [
        'Daily hip opener stretches (90/90 stretch, pigeon pose)',
        'Thoracic spine rotation exercises',
        'Shoulder and lat mobility work before practice',
      ],
    },
    hipRotation: {
      title: 'Fix Hip Rotation',
      drills: [
        'Chair drill — place a chair behind your trail hip to prevent sliding',
        'Practice rotational movements with resistance bands',
        'Step-through drill to feel proper weight transfer',
      ],
    },
    shoulderTurn: {
      title: 'Improve Shoulder Turn',
      drills: [
        'Cross-arms drill — rotate to full backswing without a club',
        'Turn your back to the target at the top of the backswing',
        'Practice with a stability ball between your arms for connection',
      ],
    },
    wristLag: {
      title: 'Develop Wrist Lag',
      drills: [
        'Pump drill — pause at the top, start down, pause halfway, then swing through',
        'Towel under trail arm drill to maintain connection',
        'Lag trainer or heavy club slow-motion practice',
      ],
    },
    followThrough: {
      title: 'Complete Your Follow-Through',
      drills: [
        'Hold your finish for 3 seconds after every shot',
        'Practice swinging to a "trophy pose" finish',
        'Mirror work focusing on full rotation to the finish',
      ],
    },
    balance: {
      title: 'Improve Balance',
      drills: [
        'Hit balls standing on a foam pad or balance board',
        'Feet-together drill for 20 balls',
        'One-legged balance exercises as part of warm-up',
      ],
    },
    clubSpeed: {
      title: 'Increase Club Speed',
      drills: [
        'Overspeed training with lightweight clubs',
        'Speed training protocol — alternate fast and slow swings',
        'Focus on proper sequencing: hips lead, then torso, then arms, then club',
      ],
    },
    attackAngle: {
      title: 'Fix Attack Angle',
      drills: [
        'Tee-in-front drill — place a tee 4 inches in front of the ball and clip it',
        'Headcover behind the ball drill to shallow the club',
        'Focus on keeping chest over the ball through impact',
      ],
    },
    clubPath: {
      title: 'Fix Club Path',
      drills: [
        'Inside-out swing path drill with a headcover outside the ball',
        'Alignment stick on the ground for visual path reference',
        'Trail elbow drill — keep trail elbow in front of trail hip in the downswing',
      ],
    },
    faceControl: {
      title: 'Improve Face Control',
      drills: [
        'Spray foot powder on the clubface to check strike location',
        'Half-swing face control drill — square face at every checkpoint',
        'Grip pressure drill — consistent light grip pressure throughout',
      ],
    },
  };

  for (const weakness of sortedWeaknesses.slice(0, 3)) {
    const drill = drillLibrary[weakness.metric];
    if (drill) {
      recommendations.push({
        priority: weakness.severity,
        area: weakness.metric,
        title: drill.title,
        reason: weakness.description,
        drills: drill.drills,
      });
    }
  }

  // Goal-specific recommendations
  if (goalSwingType) {
    const goalPro = proGolfers.find(p => p.id === goalSwingType);
    if (goalPro) {
      const biggestGaps = findBiggestGaps(userProfile, goalPro.swingProfile);
      recommendations.push({
        priority: 'goal',
        area: 'goal-swing',
        title: `Path to a ${goalPro.name}-Style Swing`,
        reason: `To develop a swing like ${goalPro.name}, focus on these key areas where you have the biggest gaps.`,
        drills: biggestGaps.map(
          gap =>
            `Improve your ${gap.label} (currently ${gap.userScore} vs ${goalPro.name}'s ${gap.proScore}) — ${drillLibrary[gap.metric]?.drills[0] || 'Work with a teaching professional'}`
        ),
      });
    }
  }

  return recommendations;
}

function findBiggestGaps(userProfile, proProfile) {
  const gaps = [];
  for (const [key, proValue] of Object.entries(proProfile)) {
    if (userProfile[key] !== undefined && !key.startsWith('_')) {
      const diff = proValue - userProfile[key];
      if (diff > 5) {
        gaps.push({
          metric: key,
          label: key.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()),
          userScore: Math.round(userProfile[key]),
          proScore: proValue,
          gap: diff,
        });
      }
    }
  }
  return gaps.sort((a, b) => b.gap - a.gap).slice(0, 3);
}

function calculateOverallScore(profile) {
  const metrics = Object.entries(profile).filter(([key]) => !key.startsWith('_'));
  const sum = metrics.reduce((acc, [, val]) => acc + val, 0);
  return Math.round(sum / metrics.length);
}
