const appReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      return { ...state, users: action.payload };

    case 'ADD-TODOS':
      return { ...state, todos: action.payload };

    case 'ADD-POSTS':
      return { ...state, posts: action.payload };

    case 'ADD-SEARCH':
      return { ...state, nameToSearch: action.payload.nameToSearch };

    case 'UPDATE':
      let currentUsers2 = [];
      let items2 = Object.values(state.users)
      items2.forEach(element => {
        currentUsers2.push(element);
      });

      let index2 = currentUsers2.findIndex(x => x.id == action.payload.id);
      if (index2 > -1) {
        currentUsers2[index2] = action.payload;
      }
      return { ...state, users: currentUsers2 };

    case 'DELETE':
      let currentUsers3 = [];
      let items = Object.values(state.users)
      items.forEach(element => {
        currentUsers3.push(element);
      });

      let index = currentUsers3.findIndex(x => x.id == action.payload);
      if (index > -1) {
        currentUsers3.splice(index, 1);
      }

      return { ...state, users: currentUsers3 };

    case 'COMPLETE':
      let currentTodos = [];
      let items4 = Object.values(state.todos)
      items4.forEach(element => {
        currentTodos.push(element);
      });

      let index4 = currentTodos.findIndex(x => x.id == action.payload.id);
      if (index4 > -1) {
        currentTodos[index4] = action.payload;
      }
      return { ...state, todos: currentTodos };


    case 'ADD-USER':
      let currentUsers5 = [];
      let items5 = Object.values(state.users)
      items5.forEach(element => {
        currentUsers5.push(element);
      });

      var ids = currentUsers5.map(d => d.id);
      var maxId = Math.max(...ids);
      var user = {
        id: maxId + 1,
        name: action.payload.name,
        email: action.payload.email,
        address: {
          city: '',
          street: '',
          zipcode: ''
        }
      }
      currentUsers5.push(user);

      return { ...state, users: currentUsers5 };

      case 'ADD-TODO':
        let currentTodos6 = [];
        let items6 = Object.values(state.todos)
        items6.forEach(element => {
          currentTodos6.push(element);
        });
  
        var todoIds = currentTodos6.map(d => d.id);
        var maxId = Math.max(...todoIds);

        var todo= {
          userId: action.payload.userId,
          id: maxId + 1,
          title: action.payload.title,
          completed: false
      }
      currentTodos6.push(todo);
  
        return { ...state, todos: currentTodos6 };

        case 'ADD-POST':
          let currentPosts7 = [];
          let items7 = Object.values(state.posts)
          items7.forEach(element => {
            currentPosts7.push(element);
          });
    
          var postIds = currentPosts7.map(d => d.id);
          var maxId = Math.max(...postIds);
  
          var post= {
            userId: action.payload.userId,
            id: maxId + 1,
            title: action.payload.title,
            body: action.payload.body
        }
        currentPosts7.push(post);
    
          return { ...state, posts: currentPosts7 };

    default:
      return state;
  }
}

export default appReducer;