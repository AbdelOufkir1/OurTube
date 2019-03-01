import React, { Component } from 'react';
import AddUser from '../components/Editor/adduser';
import AddFeed from '../components/Editor/addfeed';
import UserList from '../containers/Editor/userlist';
import FeedList from '../containers/Editor/feedlist';
import './editorApp.css';


class EditorApp extends Component {
  constructor(props) {
    super(props)
    this.state = {
      addUserInputField: '',
      userSrchInputField: '',
      userSrchStr: '',
      userList: ['Guest', 'Mo', 'Taq', 'Abdel', 'TK', 'Kevin', 'Q', 'Mielyn', 'Yun', 'Osita', 'Van', 'Tarekul','Tamarind'],
      orderedList: ['Guest', 'Mo', 'Taq', 'Abdel', 'TK', 'Kevin', 'Q', 'Mielyn', 'Yun', 'Osita', 'Van', 'Tarekul','Tamarind'],

      selectedIndex: 0,
      users: {
        'guest': {
          displayName: 'GuesT',
          feeds: [
            {
              feedname: 'cats',
              videos: [
                {
                  vidID: 'hY7m5jjJ9mM',  // <-- alphanumerical video id
                  title: 'CATS will make you LAUGH YOUR HEAD OFF - Funny CAT compilation',
                  duration: '', // <--- length of the video in hh:mm:ss
                  channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
                  description: 'Cats are amazing creatures because they make us laugh all the time! Watching funny cats is the hardest try not to laugh challenge! Just look how all these cats ...', // <--- description of the video
                  viewCount: '',  //<--- how many times it was watched
                  publishedAt: '2017-05-31T09:30:02.000Z', // <--- date video was put on youtube}],
                  thumbnail: 'https://i.ytimg.com/vi/hY7m5jjJ9mM/maxresdefault.jpg'
                },
                {
                  vidID: 'Rmx1JGTX1yw',  // <-- alphanumerical video id
                  title: 'Funniest CATS EVER - Die LAUGING NOW!',
                  duration: '', // <--- length of the video in hh:mm:ss
                  channelTitle: 'Tiger FunnyWorks', // <-- channel video originated from 
                  description: 'Cats are the best pets and animals! Cats and kittens are so funny, they make us laugh and happy! They never fail to amuse us! This is the most impossible TRY ...', // <--- description of the video
                  viewCount: '',  //<--- how many times it was watched
                  publishedAt: '2018-07-26T11:00:05.000Z', // <--- date video was put on youtube}],
                  thumbnail: 'https://i.ytimg.com/vi/Rmx1JGTX1yw/maxresdefault.jpg'
                },
              ],
              lastUpdated: new Date(),
            }
          ],
        }
      }
    }
  }
// Add User Logic ----------------->
  clickAddBtn = (e) =>{
    const newUser = this.state.addUserInputField;
    const userKey = newUser.toLowerCase();

    if (!newUser) return;

    if (newUser.length >30){
      alert('The user name is too long!');
      this.setState({addUserInputField: ''});

    } else if (this.state.users[userKey]){
      alert('This user already exists. Please choose another name.');
      this.setState({addUserInputField: ''});

    } else {
      const newUserList = [newUser].concat([this.state.userList]);
      const newOrderedList = this.state.orderedList.concat([newUser]);
      const newUsersObj = Object.assign({}, this.state.users);
      newUsersObj[userKey] = {displayName: newUser, feeds: [], };
      const lastIndex = this.state.orderedList.length;

      this.setState({
        addUserInputField: '',
        userList: newUserList,
        orderedList: newOrderedList,
        users: newUsersObj,
        selectedIndex: lastIndex
      });
    }
  }

  onUserEnter = (e) =>{
    if (e.key !== 'Enter') return;
    if (!this.state.addUserInputField) return;
    if (this.state.addUserInputField.length > 25){
      alert('The user name is too long!')
      this.setState({
        addUserInputField: '',
      });
    } else {
      this.clickAddBtn();
    }
  }

  updateUserInputField = (e) =>{
    this.setState({addUserInputField: e.target.value});
  }
// <--------------- Add User Logic

// User Dropdown Logic ----------------->
  showMatchingUsers = (e) => {
    if(e.target.value.length > 25){
      alert('The username is too long!')
      this.setState({
        userSrchInputField: '',
        userSrchStr: '',
      });
    } else {
      this.setState({
        userSrchStr: e.target.value.toLowerCase().trim(),
        userSrchInputField: e.target.value,
      });
    }
  }

  clickUser = (e) => {
    const index = parseInt(e.target.getAttribute('index'));
    const mostRecentUser = this.state.orderedList[index];
    const usersSet = new Set([mostRecentUser].concat(this.state.userList));
    const userArr = Array.from(usersSet);
    this.setState({
      userList: userArr, 
      selectedIndex: index,
      userSrchInputField: '',
      userSrchStr: '',
    });
  }

  clickX = (e) =>{

  }
// <--------------- User Dropdown Logic



  componentDidMount = () =>{
    // localStorage.getItem('');
    // ordered list becomes a copy of userlist;
    // const usersList = Object.keys(this.state.users);
    // const currUser = this.state.userList[0];
    // const currFeedObjs = this.state.users[currUser].feeds;
    // const currentFeeds = currFeedObjs.map( feed => feed.feedname );
    // this.setState({});
    // localStorage.setItem('');
  }

  render() {
    const {orderedList, 
            userList, 
            addUserInputField,
            selectedIndex,
            userSrchStr,
            userSrchInputField,
          } = this.state;

    return (
      <div className='editor-wrapper'>
        <div className='userbox'>
          <AddUser 
            clickAddBtn={this.clickAddBtn}
            onUserEnter={this.onUserEnter}
            addUserInputField={addUserInputField}
            updateUserInputField={this.updateUserInputField}
          />
          <br />          
          <UserList 
            clickUser={this.clickUser}
            currUser={userList[0]} 
            orderedList={orderedList}
            selectedIndex={selectedIndex}
            showMatchingUsers={this.showMatchingUsers}
            searchStr={userSrchStr}
            userSrchInputField={userSrchInputField}
            clickX={this.clickX}
          />
        </div>
        <div className='feedbox'>
          <AddFeed />
          <br />
          <FeedList />
        </div>
      </div>
    );
  }
}

export default EditorApp;
