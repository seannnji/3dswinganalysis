import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Calendar, Clock, Users, DollarSign, Palette, Trophy, ArrowLeft, Sparkles } from 'lucide-react';
import { createRound } from '../utils/storage.js';
import { SAMPLE_COURSES, GOLF_FORMATS, THEMES } from '../data/courses.js';

export default function CreateRoundPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    courseName: '',
    courseLocation: '',
    date: '',
    teeTime: '',
    maxPlayers: 4,
    costPerPerson: 0,
    format: 'stroke',
    theme: 'classic',
    description: '',
    hostName: '',
    hostVenmo: '',
    allowWaitlist: true,
  });
  const [courseSearch, setCourseSearch] = useState('');
  const [showCourseSuggestions, setShowCourseSuggestions] = useState(false);

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function selectCourse(course) {
    setForm(prev => ({
      ...prev,
      courseName: course.name,
      courseLocation: course.location,
    }));
    setCourseSearch(course.name);
    setShowCourseSuggestions(false);
  }

  function handleCourseInput(e) {
    const val = e.target.value;
    setCourseSearch(val);
    setForm(prev => ({ ...prev, courseName: val, courseLocation: '' }));
    setShowCourseSuggestions(val.length > 0);
  }

  const filteredCourses = SAMPLE_COURSES.filter(c =>
    c.name.toLowerCase().includes(courseSearch.toLowerCase())
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title || !form.courseName || !form.date || !form.teeTime || !form.hostName) return;
    const round = createRound({
      ...form,
      costPerPerson: Number(form.costPerPerson),
      maxPlayers: Number(form.maxPlayers),
    });
    navigate(`/round/${round.id}`);
  }

  const selectedTheme = THEMES.find(t => t.value === form.theme) || THEMES[0];

  return (
    <div className="create-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={18} />
        Back
      </button>

      <div className="create-header">
        <Sparkles size={28} className="create-header-icon" />
        <h1>Create a Round</h1>
        <p>Set up your tee time and invite the crew.</p>
      </div>

      {/* Theme Preview Banner */}
      <div className="create-preview" style={{ background: selectedTheme.gradient }}>
        <span className="create-preview-emoji">&#9971;</span>
        <h2>{form.title || 'Your Round Title'}</h2>
        <p>{form.courseName || 'Course Name'}</p>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        {/* Basic Info */}
        <div className="form-section">
          <h3 className="form-section-title">The Basics</h3>

          <div className="form-group">
            <label>Round Title *</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Saturday Morning Scramble"
              required
            />
          </div>

          <div className="form-group">
            <label>Your Name *</label>
            <input
              type="text"
              name="hostName"
              value={form.hostName}
              onChange={handleChange}
              placeholder="Tiger Woods"
              required
            />
          </div>

          <div className="form-group form-group-course">
            <label>
              <MapPin size={14} />
              Golf Course *
            </label>
            <input
              type="text"
              value={courseSearch}
              onChange={handleCourseInput}
              onFocus={() => courseSearch && setShowCourseSuggestions(true)}
              onBlur={() => setTimeout(() => setShowCourseSuggestions(false), 200)}
              placeholder="Search or type a course name..."
              required
            />
            {showCourseSuggestions && filteredCourses.length > 0 && (
              <div className="course-suggestions">
                {filteredCourses.map(course => (
                  <button
                    key={course.name}
                    type="button"
                    className="course-suggestion"
                    onMouseDown={() => selectCourse(course)}
                  >
                    <span className="course-suggestion-name">{course.name}</span>
                    <span className="course-suggestion-location">{course.location}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>
                <Calendar size={14} />
                Date *
              </label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>
                <Clock size={14} />
                Tee Time *
              </label>
              <input
                type="time"
                name="teeTime"
                value={form.teeTime}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Bring your A-game (or at least some extra balls)..."
              rows={3}
            />
          </div>
        </div>

        {/* Details */}
        <div className="form-section">
          <h3 className="form-section-title">Details</h3>

          <div className="form-row">
            <div className="form-group">
              <label>
                <Users size={14} />
                Max Players
              </label>
              <select name="maxPlayers" value={form.maxPlayers} onChange={handleChange}>
                {[2, 3, 4, 5, 6, 8, 12, 16, 20, 24].map(n => (
                  <option key={n} value={n}>{n} players</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>
                <DollarSign size={14} />
                Cost Per Person
              </label>
              <input
                type="number"
                name="costPerPerson"
                value={form.costPerPerson}
                onChange={handleChange}
                min="0"
                placeholder="0"
              />
            </div>
          </div>

          <div className="form-group">
            <label>
              <Trophy size={14} />
              Format
            </label>
            <div className="format-options">
              {GOLF_FORMATS.map(f => (
                <button
                  key={f.value}
                  type="button"
                  className={`format-option ${form.format === f.value ? 'selected' : ''}`}
                  onClick={() => setForm(prev => ({ ...prev, format: f.value }))}
                >
                  <span className="format-label">{f.label}</span>
                  <span className="format-desc">{f.description}</span>
                </button>
              ))}
            </div>
          </div>

          {form.costPerPerson > 0 && (
            <div className="form-group">
              <label>Your Venmo / Payment Handle</label>
              <input
                type="text"
                name="hostVenmo"
                value={form.hostVenmo}
                onChange={handleChange}
                placeholder="@your-venmo"
              />
            </div>
          )}

          <label className="checkbox-label">
            <input
              type="checkbox"
              name="allowWaitlist"
              checked={form.allowWaitlist}
              onChange={handleChange}
            />
            Allow waitlist when full
          </label>
        </div>

        {/* Theme */}
        <div className="form-section">
          <h3 className="form-section-title">
            <Palette size={16} />
            Theme
          </h3>
          <div className="theme-options">
            {THEMES.map(t => (
              <button
                key={t.value}
                type="button"
                className={`theme-option ${form.theme === t.value ? 'selected' : ''}`}
                onClick={() => setForm(prev => ({ ...prev, theme: t.value }))}
              >
                <div className="theme-swatch" style={{ background: t.gradient }} />
                <span>{t.label}</span>
              </button>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg create-submit">
          <Sparkles size={20} />
          Create Round
        </button>
      </form>
    </div>
  );
}
