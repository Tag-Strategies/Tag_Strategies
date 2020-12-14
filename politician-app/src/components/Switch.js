import React from 'react'

export default class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: 'Hello!'};
    // This line is important!
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    alert(this.state.message);
  }

  render() {
    // Because `this.handleClick` is bound, we can use it as an event handler.
    return (
      <div>
        <form>
        <button onClick={this.handleClick}>
          Say hello
        </button>
        <div class='form-field'>
          <label>Checkbox</label>
          <div class="field-inner">
            <div class='switch'>
              <input type="checkbox" name='checkbox' id='check1'></input>
              <span class='checked'></span>
              <label for="check1">Nope/Yup!</label>
            </div>
          </div>
        </div>
        <div class='form-field'>
          <label>Radio</label>
          <div class="field-inner">
            <div class='switch'>
              <input type="radio" name='radio' id='yes1' />
              <span class='checked'></span>
              <label for="yes">Yup!</label>
            </div>
            <div class='switch'>
              <input type="radio" name='radio' id='no1'></input>
              <span class='checked'></span>
              <label for="no">Nope!</label>
            </div>
          </div>
          </div>
        </form>
      </div>
    );
  }
}