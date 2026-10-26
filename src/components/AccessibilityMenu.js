import React, { Component } from 'react';
import { A11Y_OPTIONS, loadPreferences, savePreferences, applyPreferences } from '../utils/accessibility';

// Botón "Accesibilidad" de la barra: abre un panel con opciones de lectura
export default class AccessibilityMenu extends Component {
  state = {
    open: false,
    preferences: loadPreferences()
  };

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
    document.addEventListener('mousedown', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
    document.removeEventListener('mousedown', this.handleClickOutside);
  }

  setWrapper = (node) => {
    this.wrapper = node;
  };

  handleKeyDown = (event) => {
    if (event.key === 'Escape' && this.state.open) {
      this.setState({ open: false });
      if (this.toggleButton) this.toggleButton.focus();
    }
  };

  handleClickOutside = (event) => {
    if (this.state.open && this.wrapper && !this.wrapper.contains(event.target)) {
      this.setState({ open: false });
    }
  };

  toggleOption = (key) => {
    const preferences = { ...this.state.preferences, [key]: !this.state.preferences[key] };
    this.setState({ preferences });
    savePreferences(preferences);
    applyPreferences(preferences);
  };

  render() {
    const { open, preferences } = this.state;

    return (
      <div className="a11y-menu" ref={this.setWrapper}>
        <button
          type="button"
          className="navbar__link a11y-menu__toggle"
          aria-expanded={open}
          aria-controls="a11y-panel"
          ref={(node) => { this.toggleButton = node; }}
          onClick={() => this.setState({ open: !open })}
        >
          <span aria-hidden="true">Aa</span> Accesibilidad
        </button>

        {open && (
          <div className="a11y-menu__panel" id="a11y-panel">
            <p className="a11y-menu__title">Opciones de lectura</p>
            {A11Y_OPTIONS.map((option) => (
              <label key={option.key} className="a11y-menu__option">
                <input
                  type="checkbox"
                  checked={Boolean(preferences[option.key])}
                  onChange={() => this.toggleOption(option.key)}
                />
                {option.label}
              </label>
            ))}
            <p className="a11y-menu__hint">Se recuerda en este navegador y también se aplica a las fichas impresas.</p>
          </div>
        )}
      </div>
    );
  }
}
