import React from 'react';
import {create} from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe('ProfileStatus Component', () => {
  it('status in the props should be in component\'s state', () => {
    const component = create(<ProfileStatus status="it-kamasutra.com"/>);
    const instance = component.getInstance();
    expect(instance.state.status).toBe('it-kamasutra.com');
  });

  it('in not editMode should be present span', () => {
    const component = create(<ProfileStatus status="it-kamasutra.com"/>);
    const root = component.root;
    const span = root.findByType('span');
    expect(span).not.toBeNull();
  });
  it('in not editMode should contain correct status in the span', () => {
    const component = create(<ProfileStatus status="it-kamasutra.com"/>);
    const root = component.root;
    const span = root.findByType('span');
    expect(span.props.children).toBe('it-kamasutra.com');
  });
  it('in not editMode should not be present input', () => {
    const component = create(<ProfileStatus status="it-kamasutra.com"/>);
    const root = component.root;
    expect(() => {root.findByType('input');}).toThrow();
  });
  it('in  editMode should be present input', () => {
    const component = create(<ProfileStatus status="it-kamasutra.com"/>);
    const root = component.root;
    const span = root.findByType('span');
    span.props.onDoubleClick();
    const input = root.findByType('input');
    expect(input).not.toBeNull();
    expect(input.props.value).toBe('it-kamasutra.com');
  });
  it('callback should be called', () => {
    const callbackFn = jest.fn();
    const component = create(<ProfileStatus status="it-kamasutra.com" updateUserStatus={callbackFn}/>);
    const instance = component.getInstance();
    instance.setState({editMode: true});
    instance.toggleEditMode();
    expect(callbackFn.mock.calls.length).toBe(1);
  });
});