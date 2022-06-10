import profileReducer, {addPostActionCreator, deletePost} from './profileReducer';


const initialState = {
  posts: [
    {id: 1, message: 'Post 1', likeCount: 55},
    {id: 2, message: 'Second post', likeCount: 42},
    {id: 3, message: 'Third post', likeCount: 30},
    {id: 4, message: 'Fourth post', likeCount: 18}
  ],
  profile: null,
  status: ''
};

it('should incremented length of posts', () => {
  let action = addPostActionCreator('it-kamasutra.com');
  let newState = profileReducer(initialState, action);
  expect(newState.posts.length).toBe(5);

});
it('should have correct message', () => {
  let action = addPostActionCreator('it-kamasutra.com');
  let newState = profileReducer(initialState, action);

  expect(newState.posts[4].message).toEqual('it-kamasutra.com');
});
it('should have correct likeCount', () => {
  let action = addPostActionCreator('it-kamasutra.com');
  let newState = profileReducer(initialState, action);

  expect(newState.posts[4].likeCount).toEqual(0);
});
it('should decrement messages length after deleting', () => {
  let action = deletePost(1);
  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(3);
});
it("should not decrement messages length if post's Id is incorrect", () => {
  let action = deletePost(0);
  let newState = profileReducer(initialState, action);

  expect(newState.posts.length).toBe(4);
});
