import React, { Component } from 'react';
import { TextField, Button } from '@material-ui/core';
import { descriptionRegex } from '../helper/regularExpression';

interface DescriptionState {
  description: string;
  descriptionError: string;
}

interface DescriptionProps {
  saveDescription: Function;
}
class Description extends Component<DescriptionProps, DescriptionState> {
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      descriptionError: '',
    };
  }

  changeDescription = (event) => {
    const isValidSyntax = descriptionRegex(event.target.value);
    if (isValidSyntax) {
      this.setState({ descriptionError: '' });
    } else {
      this.setState({ descriptionError: 'Description should start with either Add,Correct,Change,Remove or Delete' });
    }
    if (event.target.value.length > 100) {
      this.setState({ descriptionError: 'Length should not exceed 100 characters' });
    }
    this.setState({ description: event.target.value });
  };

  saveDescription = () => {
    this.props.saveDescription(this.state.description);
  }

  render() {
    const { descriptionError, description } = this.state;


    return (
      <div>
        <br />
        <i>There are changes in the file. Please add a valid description to change to save it</i>
        <TextField
          fullWidth
          id="change-description"
          value={description}
          label="Description"
          margin="normal"
          variant="outlined"
          placeholder="Add a description..."
          onChange={this.changeDescription}
        />
        {descriptionError ? (
          <div id="description-error">
            {descriptionError}
          </div>
        )
          : null}
        <Button
          disabled={descriptionError !== '' || description === ''}
          fullWidth
          id="btn-saveDescription"
          variant="contained"
          color="default"
          onClick={this.saveDescription}
          size="small"
        >
            save description
        </Button>
      </div>
    );
  }
}

export default Description;
