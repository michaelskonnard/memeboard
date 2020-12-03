<template>
  <div class="admin">
    <h1>The Admin Page!</h1>
    <div class="heading">
      <div class="circle">1</div>
      <h2>Add a Meme</h2>
    </div>
    <div class="add">
      <!--Adding a meme-->
      <div class="form">
        <input v-model="date" placeholder="Date Created" />
        <p></p>
        <textarea
          class="textbox"
          v-model="caption"
          placeholder="Meme Caption"
        />
        <p></p>
        <input type="file" caption="photo" @change="fileChanged" />
        <button @click="upload">Upload</button>
      </div>
      <div class="upload" v-if="addItem">
        <h2>{{ addItem.date }}</h2>
        <textarea
          class="textbox"
          readonly
          v-model="caption"
          placeholder="Meme Caption"
        />
        <img :src="addItem.path" />
      </div>
    </div>
    <div class="heading">
      <div class="circle">2</div>
      <h2>Edit/Delete an Item</h2>
    </div>
    <div class="edit">
      <div class="form">
        <input v-model="findCaption" placeholder="Search" />
        <div class="suggestions" v-if="suggestions.length > 0">
          <div
            class="suggestion"
            v-for="s in suggestions"
            :key="s.id"
            @click="selectItem(s)"
          >
            {{ s.caption }}
          </div>
        </div>
      </div>
      <div class="upload" v-if="findItem">
        <input v-model="findItem.date" />
        <p></p>
        <textarea class="textbox" v-model="findItem.caption" />
        <p></p>
        <img :src="findItem.path" />
      </div>
      <div class="actions" v-if="findItem">
        <button @click="deleteItem(findItem)">Delete</button>
        <button @click="editItem(findItem)">Edit</button>
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
      caption: "",
      date: "",
      file: null,
      addItem: null,
      items: [],
      findCaption: "",
      findItem: null,
    };
  },
  computed: {
    suggestions() {
      let items = this.items.filter((item) =>
        item.caption.toLowerCase().startsWith(this.findCaption.toLowerCase())
      );
      return items.sort((a, b) => a.caption > b.caption);
    },
  },
  created() {
    this.getItems();
  },
  methods: {
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    selectItem(item) {
      this.findCaption = "";
      this.findItem = item;
    },
    async editItem(item) {
      try {
        await axios.put("/api/items/" + item._id, {
          caption: this.findItem.caption,
          date: this.findItem.date,
        });
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/items/" + item._id);
        this.findItem = null;
        this.getItems();
        return true;
      } catch (error) {
        // console.log(error);
      }
    },
    async upload() {
      console.log("upload called");
      try {
        const formData = new FormData();
        formData.append("photo", this.file, this.file.caption);
        let r1 = await axios.post("/api/photos", formData);
        let r2 = await axios.post("/api/items", {
          caption: this.caption,
          date: this.date,
          path: r1.data.path,
        });
        this.addItem = r2.data;
      } catch (error) {
        // console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        return true;
      } catch (error) {
        // console.log(error);
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
