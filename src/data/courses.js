export const SAMPLE_COURSES = [
  { name: 'Pebble Beach Golf Links', location: 'Pebble Beach, CA', holes: 18, par: 72 },
  { name: 'Augusta National Golf Club', location: 'Augusta, GA', holes: 18, par: 72 },
  { name: 'Torrey Pines (South)', location: 'La Jolla, CA', holes: 18, par: 72 },
  { name: 'Bandon Dunes', location: 'Bandon, OR', holes: 18, par: 72 },
  { name: 'Bethpage Black', location: 'Farmingdale, NY', holes: 18, par: 71 },
  { name: 'Pinehurst No. 2', location: 'Pinehurst, NC', holes: 18, par: 72 },
  { name: 'TPC Sawgrass', location: 'Ponte Vedra Beach, FL', holes: 18, par: 72 },
  { name: 'Whistling Straits', location: 'Haven, WI', holes: 18, par: 72 },
  { name: 'Chambers Bay', location: 'University Place, WA', holes: 18, par: 72 },
  { name: 'Kiawah Island (Ocean)', location: 'Kiawah Island, SC', holes: 18, par: 72 },
  { name: 'The Olympic Club', location: 'San Francisco, CA', holes: 18, par: 71 },
  { name: 'Erin Hills', location: 'Erin, WI', holes: 18, par: 72 },
];

export const GOLF_FORMATS = [
  { value: 'stroke', label: 'Stroke Play', description: 'Traditional — lowest total score wins' },
  { value: 'match', label: 'Match Play', description: 'Hole-by-hole competition' },
  { value: 'scramble', label: 'Scramble', description: 'Best shot from the group each time' },
  { value: 'bestball', label: 'Best Ball', description: 'Each player plays their own ball, best score counts' },
  { value: 'shamble', label: 'Shamble', description: 'Best drive, then individual play' },
  { value: 'skins', label: 'Skins', description: 'Win the hole, win the skin' },
  { value: 'casual', label: 'Just for Fun', description: 'No scoring, just vibes' },
];

export const THEMES = [
  { value: 'classic', label: 'Classic Green', gradient: 'linear-gradient(135deg, #0d4a2e 0%, #1a6b42 30%, #2d8f5e 60%, #43b97c 100%)' },
  { value: 'sunset', label: 'Sunset Round', gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7c948 30%, #2d8f5e 70%, #0d4a2e 100%)' },
  { value: 'dawn', label: 'Dawn Patrol', gradient: 'linear-gradient(135deg, #1a1a3e 0%, #2d4a3e 40%, #2d8f5e 80%, #90ee90 100%)' },
  { value: 'links', label: 'Links Course', gradient: 'linear-gradient(135deg, #0b3d2e 0%, #1b6b4a 50%, #87ceeb 100%)' },
  { value: 'autumn', label: 'Fall Golf', gradient: 'linear-gradient(135deg, #2c1810 0%, #4a3728 30%, #2d8f5e 70%, #43b97c 100%)' },
  { value: 'tropical', label: 'Tropical Tee', gradient: 'linear-gradient(135deg, #1a3a2a 0%, #2d6b4a 40%, #f4a460 100%)' },
];
