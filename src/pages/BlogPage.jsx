import { useState } from 'react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 'fix-your-slice',
    title: 'How to Fix Your Slice: A Step-by-Step Guide',
    category: 'How-To',
    date: '2026-02-10',
    excerpt: 'The slice is the most common miss in golf. Here\'s exactly why it happens and the 3 drills that will fix it for good.',
    readTime: '8 min read',
    content: `
## Why You Slice the Ball

A slice happens when your clubface is open relative to your club path at impact. It's that simple — but fixing it requires understanding the root cause.

### The 3 Main Causes

**1. Over-the-Top Move**
The most common cause. Your downswing starts with your shoulders instead of your hips, throwing the club outside the target line. This creates an out-to-in path, and if the face is open to that path, you get a slice.

**2. Weak Grip**
If your grip is too weak (rotated too far left for right-handers), the face naturally opens through impact. Even with a good path, a weak grip can produce a slice.

**3. Poor Weight Transfer**
Staying on your back foot or "hanging back" makes it nearly impossible to square the face. The club gets stuck behind you and the face stays open.

### The 3 Drills That Fix It

#### Drill 1: The Headcover Drill
Place a headcover about 6 inches outside and behind the ball. If you come over the top, you'll hit the headcover. This trains an inside-out path.

1. Place the headcover outside the ball-target line, about a foot behind the ball
2. Make slow swings avoiding the headcover
3. Gradually increase speed as the path becomes natural

#### Drill 2: The Strong Grip Check
At address, you should see 2.5-3 knuckles on your lead hand. If you only see 1-2, your grip is too weak.

1. Rotate both hands slightly to the right (for right-handers)
2. The V's formed by thumbs and forefingers should point to your trail shoulder
3. This promotes a closed face and a draw

#### Drill 3: The Step-Through Drill
This forces proper weight transfer and hip rotation.

1. Start with your feet together
2. Step your lead foot toward the target as you begin the downswing
3. Let your body rotate fully through
4. This naturally shallows the club and promotes an inside path

### What to Expect

Don't expect to fix your slice in one range session. Give these drills 2-3 weeks of consistent practice. Start with half swings and gradually build up to full speed. Many golfers will see their slice turn into a controlled fade within a week, and a draw within a month.
    `,
  },
  {
    id: 'add-distance',
    title: '5 Ways to Add 20+ Yards Off the Tee',
    category: 'How-To',
    date: '2026-02-08',
    excerpt: 'Distance comes from speed, and speed comes from efficiency. Here are 5 proven methods to add serious yardage.',
    readTime: '6 min read',
    content: `
## It's Not About Swinging Harder

Most golfers try to add distance by swinging harder. That usually makes things worse. Real distance gains come from better efficiency and optimized launch conditions.

### 1. Optimize Your Launch Conditions

The ideal driver launch for most amateurs is:
- **Launch angle:** 12-15° (most amateurs launch too low)
- **Spin rate:** 2,000-2,600 rpm (most amateurs spin too much)
- **Attack angle:** Slightly up (+2 to +5°)

**Quick fix:** Tee the ball higher and position it further forward in your stance. This promotes an upward hit that launches higher with less spin.

### 2. Improve Your Sequencing

Power comes from the ground up: feet → hips → torso → arms → club. If you start the downswing with your arms, you're leaving 15-20 yards on the table.

**Drill:** The Pump Drill — Take the club to the top, start down with your hips while your arms stay back, pause, then swing through. Feel the "lag" this creates.

### 3. Speed Training

Overspeed training works. Swing a lighter club (or a speed training system) as fast as you can for 3 sets of 5 swings, 3 times per week. Studies show 5-8% speed gains in 6-8 weeks.

### 4. Get Fit for Your Equipment

A driver that doesn't fit your swing is robbing you of distance:
- Wrong shaft flex = energy loss
- Wrong loft = poor launch conditions
- Wrong ball = too much spin

A proper fitting can add 10-20 yards without changing your swing.

### 5. Improve Your Flexibility

A bigger shoulder turn creates more "coil" — the difference between your shoulder turn and hip turn. Tour pros average about 90° of shoulder turn with 45° of hip turn, creating 45° of coil. More coil = more stored energy.

**Daily routine:**
- 90/90 hip stretches (2 min each side)
- Thoracic spine rotations (10 each way)
- Shoulder stretches with a club behind your back
    `,
  },
  {
    id: 'practice-plan',
    title: 'The Perfect Practice Plan for a 15-Handicapper',
    category: 'Ideas',
    date: '2026-02-05',
    excerpt: 'Stop beating balls aimlessly. Here\'s a structured practice plan that will actually lower your scores.',
    readTime: '7 min read',
    content: `
## Stop Wasting Your Practice Time

Most amateur golfers hit drivers on the range for 45 minutes, putt for 5 minutes, and wonder why they don't improve. Let's fix that.

### The 60-Minute Practice Session

#### Warm-Up (10 minutes)
- 5 minutes of stretching and mobility work
- Hit 10 wedge shots at 50% speed to loosen up
- Hit 5 mid-irons, focusing on tempo

#### Short Game (20 minutes)
This is where 60% of your strokes happen.
- 10 minutes of putting: start at 3 feet, work out to 15 feet
- 5 minutes of chipping from different lies
- 5 minutes of bunker play or pitch shots (30-50 yards)

#### Iron Play (15 minutes)
- Pick 3 specific targets at different distances
- Hit 5 balls at each target with different clubs
- Score yourself: 1 point for on the green, 2 for within 15 feet

#### Driver / Long Game (10 minutes)
- Pick a fairway-width target
- Hit 10 drives with your pre-shot routine
- Focus on fairways hit, not distance

#### Pressure Practice (5 minutes)
- Create a scoring game: "hit 3 out of 5 greens to pass"
- Add consequences: if you miss, start over
- This simulates on-course pressure

### Weekly Schedule (3 practice sessions)

| Day | Focus | Time |
|-----|-------|------|
| Session 1 | Full practice plan above | 60 min |
| Session 2 | Short game only (putting, chipping, pitching) | 45 min |
| Session 3 | Play 9 holes with purpose — track stats | 90 min |

### Track Your Stats

The fastest way to improve is to know where you're losing strokes:
- Fairways hit (out of 14)
- Greens in regulation (out of 18)
- Putts per round
- Up-and-down percentage

If your GIR is under 30%, work on approach shots. If your putting average is over 36, work on the green. Data tells you where to practice.
    `,
  },
  {
    id: 'mental-game',
    title: 'The Mental Game: How Tour Pros Handle Pressure',
    category: 'Ideas',
    date: '2026-02-02',
    excerpt: 'Golf is 90% mental. Learn the mental strategies that separate tour pros from amateurs.',
    readTime: '5 min read',
    content: `
## Your Brain Is Your Best (and Worst) Club

Ever hit it perfectly on the range but fall apart on the first tee? That's your mental game — and it's trainable.

### Pre-Shot Routine

Every tour pro has an identical pre-shot routine they use for every single shot. This routine:
- Creates consistency and confidence
- Reduces anxiety by focusing on process
- Gives your brain something to do instead of worrying

**Build your routine:**
1. Stand behind the ball and pick a specific target
2. Take one practice swing with that target in mind
3. Address the ball, take a breath, and go
4. Total time: under 20 seconds

### Process Over Outcome

Amateurs think about score. Pros think about the next shot.

- Don't think about what score you need
- Don't replay the last bad shot
- Focus only on: what's my target, what's my shot shape, commit and swing

### The 10-Second Rule

After a bad shot, you have 10 seconds to be frustrated. Curse, shake your head, whatever you need. After 10 seconds — it's done. Let it go and commit fully to the next shot.

Tour pros don't play 18 good holes. They play 14 okay holes and 4 great holes. The difference is they don't let the bad holes become terrible holes.

### Breathing for Pressure Shots

When you feel pressure (first tee, over water, for birdie):
1. Take 3 deep breaths — in for 4 counts, out for 6
2. This activates your parasympathetic nervous system
3. Your heart rate drops and your hands steady
4. Then run your pre-shot routine as always
    `,
  },
  {
    id: 'understanding-ball-flight',
    title: 'Understanding Ball Flight Laws: Why Your Ball Goes Where It Goes',
    category: 'How-To',
    date: '2026-01-28',
    excerpt: 'Master the new ball flight laws and you\'ll finally understand why you hit the shots you do.',
    readTime: '6 min read',
    content: `
## The New Ball Flight Laws

The old ball flight laws were wrong. Here's what actually happens at impact:

### The Two Key Factors

**1. Club Face Direction** — determines where the ball *starts*
The ball launches approximately 75-85% in the direction the face is pointing at impact.

**2. Club Path** — determines how the ball *curves*
The ball curves away from the path relative to the face. If the face is open to the path, the ball curves right (for right-handers). If closed, it curves left.

### The 9 Ball Flights

| Face | Path | Result |
|------|------|--------|
| Square | Square | Straight |
| Open | Square | Push |
| Closed | Square | Pull |
| Open | Open (in-to-out) | Push-draw or push-slice |
| Closed | Closed (out-to-in) | Pull-hook or pull-fade |
| Open | Closed (out-to-in) | Pull-slice (common slice) |
| Closed | Open (in-to-out) | Push-hook |
| Square | Open (in-to-out) | Draw |
| Square | Closed (out-to-in) | Fade |

### Why This Matters

If you understand these laws, you can diagnose any shot:

- **Ball starts right?** Face was open at impact
- **Ball starts left?** Face was closed at impact
- **Ball curves right?** Face was open relative to the path
- **Ball curves left?** Face was closed relative to the path

### Common Example: The Slice

A typical slice starts slightly left and curves hard right. This means:
- Face was slightly closed to the target (ball starts left)
- But the path was severely out-to-in (face was open to the path = curve right)
- Fix = shallow the path (make it less out-to-in)

Understanding this prevents wasting time on the wrong fix. Most slicers try to close the face more, when the real fix is improving the path.
    `,
  },
  {
    id: 'winter-practice',
    title: 'How to Improve Your Golf Game Over the Winter',
    category: 'Ideas',
    date: '2026-01-22',
    excerpt: 'Can\'t get to the course? Here are 6 ways to improve your game without hitting a single ball outdoors.',
    readTime: '5 min read',
    content: `
## Winter Is an Opportunity

While your buddies binge Netflix all winter, you can show up in spring a better golfer. Here's how.

### 1. Build Golf Fitness

Winter is the best time to get stronger and more flexible. Focus on:
- **Rotational power:** Medicine ball throws, cable rotations
- **Hip mobility:** 90/90 stretches, hip openers, pigeon pose
- **Core stability:** Planks, dead bugs, pallof press
- **Leg strength:** Squats, lunges, single-leg deadlifts

Just 20 minutes, 3x per week will transform your physical capability for golf.

### 2. Practice Putting at Home

All you need is a flat surface and a cup or putting mat.
- 100 three-foot putts per day builds bulletproof confidence
- Work on gate drills (two tees, putter width) for face control
- Speed control drills: putt to a towel at different distances

### 3. Mirror Work for Swing Positions

A full-length mirror is one of the best training aids:
- Check your address position (posture, grip, alignment)
- Work on backswing positions (shoulder turn, wrist hinge)
- Practice transition move (hip bump, maintaining angles)

### 4. Chipping in the Backyard

If you have any outdoor space:
- Chip foam balls or real balls into a laundry basket
- Focus on technique: weight forward, hands ahead, rotation through

### 5. Study Course Management

Watch tour events and study their decision-making:
- When do they lay up?
- Where do they miss?
- How do they manage bad holes?

### 6. Get Your Equipment Dialed

Winter is the perfect time for:
- Club fitting or re-gripping
- Getting your lofts and lies checked
- Testing new balls to find your best option
    `,
  },
];

function BlogPostList({ posts, onSelect }) {
  return (
    <div className="blog-grid">
      {posts.map(post => (
        <article key={post.id} className="blog-card" onClick={() => onSelect(post)}>
          <div className="blog-card-category">{post.category}</div>
          <h2 className="blog-card-title">{post.title}</h2>
          <p className="blog-card-excerpt">{post.excerpt}</p>
          <div className="blog-card-meta">
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

function BlogPostView({ post, onBack }) {
  return (
    <article className="blog-post">
      <button className="btn btn-secondary btn-sm" onClick={onBack}>
        &larr; Back to Blog
      </button>
      <div className="blog-post-header">
        <span className="blog-card-category">{post.category}</span>
        <h1>{post.title}</h1>
        <div className="blog-card-meta">
          <span>{post.date}</span>
          <span>{post.readTime}</span>
        </div>
      </div>
      <div
        className="blog-post-content"
        dangerouslySetInnerHTML={{ __html: markdownToHtml(post.content) }}
      />
      <div className="blog-post-footer">
        <h3>Ready to improve?</h3>
        <Link to="/analyze" className="btn btn-accent">
          Analyze Your Swing
        </Link>
      </div>
    </article>
  );
}

// Simple markdown to HTML converter
function markdownToHtml(md) {
  let html = md
    // Headers
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // Bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Horizontal rules
    .replace(/^---$/gm, '<hr/>')
    // Lists
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    // Numbered lists
    .replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

  // Wrap consecutive <li> in <ul>
  html = html.replace(/((?:<li>.*<\/li>\s*)+)/g, '<ul>$1</ul>');

  // Tables (simple)
  const tableRegex = /\|(.+)\|\n\|[-| ]+\|\n((?:\|.+\|\n?)+)/g;
  html = html.replace(tableRegex, (match, header, body) => {
    const headers = header.split('|').filter(Boolean).map(h => `<th>${h.trim()}</th>`).join('');
    const rows = body.trim().split('\n').map(row => {
      const cells = row.split('|').filter(Boolean).map(c => `<td>${c.trim()}</td>`).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
    return `<table><thead><tr>${headers}</tr></thead><tbody>${rows}</tbody></table>`;
  });

  // Paragraphs
  html = html.replace(/^(?!<[hulot]|<\/)(.+)$/gm, '<p>$1</p>');

  // Code blocks with #### headers
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');

  return html;
}

export default function BlogPage() {
  const [selectedPost, setSelectedPost] = useState(null);
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? blogPosts
    : blogPosts.filter(p => p.category === filter);

  if (selectedPost) {
    return (
      <div className="blog-page">
        <BlogPostView post={selectedPost} onBack={() => setSelectedPost(null)} />
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="page-header">
        <h1>Golf Blog</h1>
        <p>
          How-to guides, practice ideas, and tips to help you play your best golf.
        </p>
      </div>

      <div className="filter-bar">
        <button
          className={`filter-btn ${filter === 'all' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All Posts
        </button>
        <button
          className={`filter-btn ${filter === 'How-To' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('How-To')}
        >
          How-To Guides
        </button>
        <button
          className={`filter-btn ${filter === 'Ideas' ? 'filter-btn--active' : ''}`}
          onClick={() => setFilter('Ideas')}
        >
          Ideas & Tips
        </button>
      </div>

      <BlogPostList posts={filtered} onSelect={setSelectedPost} />

      <div className="blog-cta">
        <h2>Want personalized advice?</h2>
        <p>Get a detailed analysis of your specific swing — strengths, weaknesses, and a custom improvement plan.</p>
        <Link to="/analyze" className="btn btn-accent btn-lg">
          Analyze Your Swing
        </Link>
      </div>
    </div>
  );
}
