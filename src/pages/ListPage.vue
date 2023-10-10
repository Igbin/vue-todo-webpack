<template>
  <div>
    <header>
      <UserInfo />
      <CreateToDoForm @addToDo="addToDo" />
    </header>
    <div class="main-wrapper">
      <div class="filters">
        <div class="filter-item">
          <label for="statusSelect">Status:</label>
          <select v-model="currentStatus" id="statusSelect">
            <option v-for="status in statuses">
              {{ status }}
            </option>
          </select>
        </div>
        <div class="filter-item">
          <label for="userIdSelect">User Id:</label>
          <select v-model="currentUserId" id="userIdSelect">
            <option value="All">
              All
            </option>
            <option v-for="userId in userIds">
              {{ userId }}
            </option>
          </select>
        </div>
        <div class="filter-item">
          <label for="titleSearch">Title:</label>
          <input v-model.trim="titleSearch" type="text" id="titleSearch">
        </div>
      </div>
      <main>
        <ul class="todo-list">
          <li v-for="todo in filteredTodos" class="todo">
            <div class="todo-item">
              <span>User Id:</span>
              <b><span>{{ todo.userId }}</span></b>
            </div>
            <div class="todo-item">
              <span>Title:</span>
              <b><span>{{ todo.title }}</span></b>
            </div>
            <div class="todo-item">
              <span>Completed:</span>
              <b><span>{{ todo.completed }}</span></b>
            </div>
            <p class="favorite-icon" @click="toggleFavorites(todo.id)">
              {{ favoritesTodos.includes(todo.id) ? '\u2665' : '\u2661'}}
            </p>
          </li>
        </ul>
      </main>
    </div>
  </div>
</template>

<script>
import UserInfo from '../components/UserInfo.vue';
import CreateToDoForm from '../components/CreateToDoForm.vue';

export default {
  name: 'ListPage',
  components: { UserInfo, CreateToDoForm },
  data: () => {
    return {
      todos: [],
      userIds: [],
      favoritesTodos: [],
      statuses: ['All', 'Completed', 'Uncompleted', 'Favorites'],
      currentStatus: 'All',
      currentUserId: 'All',
      titleSearch: ''
    }
  },
  beforeMount() {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then(res => res.json())
      .then(todos => todos.forEach(todo => {
        this.todos.push(todo);

        if(!this.userIds.includes(todo.userId)) {
          this.userIds.push(todo.userId);
        }
      }));

    if (localStorage.getItem('favoritesTodos')) {
      this.favoritesTodos = JSON.parse(localStorage.getItem('favoritesTodos'));
    }
  },
  computed: {
    filteredTodos() {
      return this.todos.filter(todo => {
        const isStatusMatched = this.currentStatus === 'All' || this.currentStatus === 'Completed' && todo.completed
          || this.currentStatus === 'Uncompleted' && !todo.completed
          || this.currentStatus === 'Favorites' && this.favoritesTodos.includes(todo.id);

        const isUserIdMatched = this.currentUserId === 'All' || Number(this.currentUserId) === Number(todo.userId);
        const isSearchMatched = !this.titleSearch || todo.title.includes(this.titleSearch);

        return isStatusMatched && isUserIdMatched && isSearchMatched;
      });
    }
  },
  methods: {
    addToDo(title, userId) {
      // fetch('https://api', {
      //   method: 'POST',
      //   body: JSON.stringify({ title, userId })
      // })
      //  .then(res => res.ok ? res : Promise.reject(res))
      //  .then(res => {

         const todoId = Math.max.apply(null, this.todos.map(todo => todo = todo.id)) + 1;

         this.todos.push({
           userId,
           title,
           completed: false,
           id: todoId
         });
       // });
    },
    toggleFavorites(id) {
      if (!this.favoritesTodos.includes(id)) {
        this.favoritesTodos.push(id);
      } else {
        const index = this.favoritesTodos.findIndex(favoriteId => favoriteId === Number(id));
        this.favoritesTodos.splice(index, 1);
      }
      localStorage.setItem('favoritesTodos', JSON.stringify(this.favoritesTodos));
    }
  }
}

</script>
<style scoped lang="scss">
header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  align-items: end;
  justify-content: space-around;
  position: sticky;
  top: 0;
  padding: 10px;
  background: #545454;


  .filter-item {
    display: flex;
    flex-direction: column;

    label {
      margin-bottom: 5px;
      color: #ffffff;
    }
  }

  #titleSearch {
    height: 13px;
  }
}

.todo-list {
  list-style-type: none;
  background: #c3c3c3;
  padding: 10px;
  border-radius: 5px;

  .todo {
    width: 80%;
    margin: 10px auto;
    padding: 10px;
    border-radius: 5px;
    background: #ffffff;

    .todo-item {
      margin: 5px;

      span {
        font-size: clamp(15px, 4vw, 25px);
      }
    }

    .favorite-icon {
      height: 15px;
      margin: 0 0 5px 0;
      cursor: pointer;
      font-size: clamp(15px, 4vw, 25px);
    }
  }
}

</style>
