import React, { Component } from 'react';
import styled from 'styled-components';
import { Edit as EditIcon } from '@material-ui/icons';

const Container = styled.span``;

const View = styled.span``;

const Edit = styled.span`
  margin: auto;

  textarea {
    width: 100%;
    background: none;
    border: none;
    outline: none;
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
  }
`;

export interface EditableLabelProps {
  value: string;
  placeholder?: string;
  readOnly?: boolean;
  onChange: (value: string) => void;
}

export interface EditableLabelState {
  editMode: boolean;
}

export default class EditableLabel extends Component<EditableLabelProps, EditableLabelState> {
  inputRef: React.RefObject<HTMLTextAreaElement>;

  constructor(props: EditableLabelProps) {
    super(props);
    this.state = { editMode: false };
    this.inputRef = React.createRef();
  }

  onKeyPress(e: KeyboardEvent) {
    if (e.keyCode === 13) {
      this.setState({ editMode: false });
    }
  }

  renderReadOnlyMode() {
    const { value, placeholder } = this.props;

    return (
      <View>
        { value || placeholder }
      </View>
    );
  }

  renderViewMode() {
    const { value, placeholder, readOnly } = this.props;

    if (readOnly) {
      return this.renderReadOnlyMode();
    }

    return (
      <View
        onClick={() => this.setState({ editMode: true }, () => this.inputRef.current.focus())}
      >
        { value || placeholder }&nbsp;
        <EditIcon color="primary" />
      </View>
    );
  }

  renderEditMode() {
    const { value, onChange } = this.props;
    return (
      <Edit>
        <textarea
          ref={this.inputRef}
          value={value}
          onBlur={() => {
            this.setState({ editMode: false });
          }}
          onKeyPress={e => this.onKeyPress(e.nativeEvent)}
          onChange={v => {
            onChange(v.target.value);
          }}
        />
      </Edit>
    );
  }

  render() {
    return (
      <Container>
        { this.state.editMode ? this.renderEditMode() : this.renderViewMode() }
      </Container>
    );
  }
}
