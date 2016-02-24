import cx from 'classnames';
import forEach from 'lodash.foreach';
import Component from 'components/component';
import React from 'react';

import styles from './index.less';

export default class Combobox extends Component {
  static propTypes = {
    labels: React.PropTypes.array,
    values: React.PropTypes.array.isRequired,
    value: React.PropTypes.string.isRequired,
    onChange: React.PropTypes.func.isRequired,
    className: React.PropTypes.string,
    style: React.PropTypes.object
  };

  getInitState () {
    return {
      opened: false
    };
  }

  toggle () {
    this.setState({
      opened: !this.state.opened
    });
  }

  optionClicked ( value, event ) {
    event.preventDefault();

    if (this.props.onChange) {
      this.props.onChange(value);
    }

    this.setState({
      opened: false
    });
  }

  render () {
    const {values, labels, value, className, style} = this.props;
    let label = '';
    forEach(values, (valueIt, key) => {
      if (value === valueIt) {
        label = labels && labels[key] || valueIt;
      }
    });

    return (
      <div className={cx(styles.combobox, className)} style={style}>
        <div className={cx(styles.holder, this.state.opened && styles.opened)}>
          <div className={styles.header} onClick={this.toggle.bind(this)}>
            <div className={styles.selectedText}>{label}</div>
            <div className={styles.button}>
              <i className={cx('nc-icon-mini', this.state.opened ? 'arrows-1_minimal-up' : 'arrows-1_minimal-down')}></i>
            </div>
          </div>
          <div className={styles.options}>
            {(labels || values).map(this.renderOption, this)}
          </div>
        </div>
      </div>
    );
  }

  renderOption (option, i) {
    return (
      <div
        key={i}
        className={styles.option}
        onClick={this.optionClicked.bind(this, this.props.values[i])}>
        {option}
      </div>
    );
  }
}