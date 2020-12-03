<template>
  <div class="admin">
    <h1>The Person Page!</h1>
    <div class="heading">
      <!--Adding a person-->
      <div class="circle">1</div>
      <h2>Add a Contributor</h2>
    </div>
    <div class="add">
      <div class="form">
        <input v-model="name" placeholder="Enter Your Name" />
        <p></p>
        <input v-model="date" placeholder="Date Joined" />
        <p></p>
        <textarea
          class="textbox"
          v-model="description"
          placeholder="Tell everyone a bit about yourself!"
        />
        <p></p>
        <button @click="upload">Submit</button>
      </div>
      <div class="upload" v-if="addPerson">
        <h2>{{ addPerson.name }}</h2>
        <h2>{{ addPerson.date }}</h2>
        <textarea
          class="textbox"
          readonly
          v-model="description"
          placeholder="User Information"
        />
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete a Contributor</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findName" placeholder="Search" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectPerson(s)"
          >
            {{ s.name }}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findPerson">
        <input v-model="findPerson.name" />
        <p></p>
        <input v-model="findPerson.date" />
        <p></p>
        <textarea class="textbox" v-model="findPerson.description" />
        <p></p>
      </div>
      <div class="actions" v-if="findPerson">
        <button @click="deletePerson(findPerson)">Delete</button>
        <button @click="editPerson(findPerson)">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Admin",
  data() {
    return {
      name: "",
      date: "",
      description: "",
      addPerson: null,
      persons: [],
      findName: "",
      findPerson: null,
    };
  },
  computed: {
    suggestions() {
      let persons = this.persons.filter((person) =>
        person.name.toLowerCase().startsWith(this.findName.toLowerCase())
      );
      return persons.sort((a, b) => a.name > b.name);
    },
  },
  created() {
    this.getPersons();
  },
  methods: {
    selectPerson(person) {
      this.findName = "";
      this.findPerson = person;
    },
    async editPerson(person) {
      try {
        await axios.put("/api/persons/" + person._id, {
          name: this.findPerson.name,
          date: this.findPerson.date,
          description: this.findPerson.description,
        });
        this.findPerson = null;
        this.getPersons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deletePerson(person) {
      try {
        await axios.delete("/api/persons/" + person._id);
        this.findPerson = null;
        this.getPersons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async upload() {
      console.log("upload called");
      try {
        let r2 = await axios.post("/api/persons", {
          name: this.name,
          date: this.date,
          description: this.description,
        });
        this.addPerson = r2.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPersons() {
      try {
        let response = await axios.get("/api/persons");
        this.persons = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center;
}

/* Form */
input,
textarea,
select,
button {
  font-family: "Montserrat", sans-serif;
  font-size: 1em;
}

.textbox {
  width: 97%;
  height: 75px;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5bdeff;
  color: #fff;
}
</style>
