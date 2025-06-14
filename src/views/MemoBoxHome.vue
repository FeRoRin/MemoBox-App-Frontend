<template>
  <div class="container py-4">
    <!-- Add New Note -->
    <div class="mb-4">
      <div class="card shadow-sm border-0">
        <div class="card-body">
          <input
            v-model="newNote.title"
            type="text"
            class="form-control mb-2 border-0 fs-5"
            placeholder="Title"
          />
          <textarea
            v-model="newNote.content"
            class="form-control border-0"
            placeholder="Take a note..."
            rows="2"
          ></textarea>
         
          <div class="text-end mt-2">
            <button
              @click="addNote"
              class="btn btn-warning btn-sm rounded-pill text-white"
            >
              ADD
            </button>
            <button
          @click="cancelNewNote"
          class="btn btn-light btn-sm rounded-pill"
        >
          Cancel
        </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Update Note Form -->
    <div v-if="updatingNote" class="mb-4">
      <div class="card shadow-sm border-0 border-start border-4 border-info">
        <div class="card-body">
          <h5 class="mb-3 text-info">Edit Note</h5>
          <input
            v-model="updatingNote.title"
            type="text"
            class="form-control mb-2 border-0 fs-5"
            placeholder="Title"
          />
          <textarea
            v-model="updatingNote.content"
            class="form-control border-0"
            placeholder="Edit content..."
            rows="3"
          ></textarea>
          <div class="text-end mt-2">
            <button
              @click="updateNote"
              class="btn btn-info btn-sm rounded-pill me-2"
            >
              Update
            </button>
            <button
              @click="cancelUpdate"
              class="btn btn-secondary btn-sm rounded-pill"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Notes Grid -->
    <div class="row g-3">
      <div
        v-for="note in filteredNotes"
        :key="note.id"
        class="col-sm-6 col-md-4 col-lg-3"
      >
        <NoteCard
          :note="note"
          @delete-note="deleteNote"
          @update-note="startUpdateNote"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import NoteCard from "@/components/NoteCard.vue";

export default {
  name: "MemoBoxHome",
  components: {
    NoteCard,
  },
  props: ["searchQuery"],
  data() {
    return {
      notes: [],
      newNote: {
        title: "",
        content: "",
        color: "#fffbea",
      },
      updatingNote: null,
    };
  },
  computed: {
    filteredNotes() {
      if (!this.searchQuery) return this.notes;
      return this.notes.filter(
        (note) =>
          note.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          note.content.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  methods: {
    fetchNotes() {
      axios
        .get("http://localhost:8000/api/notes")
        .then((res) => {
          this.notes = res.data.reverse();
        })
        .catch(console.error);
    },
    addNote() {
      if (!this.newNote.title.trim() || !this.newNote.content.trim()) return;
      axios
        .post("http://localhost:8000/api/notes", this.newNote)
        .then(() => {
          this.newNote.title = "";
          this.newNote.content = "";
          this.newNote.color = "#fffbea";
          this.fetchNotes();
        })
        .catch(console.error);
    },
    deleteNote(id) {
      axios
        .delete(`http://localhost:8000/api/notes/${id}`)
        .then(() => this.fetchNotes())
        .catch(console.error);
    },
    startUpdateNote(note) {
      this.updatingNote = { ...note }; // clone to avoid direct mutation
    },
     cancelNewNote() {
    this.newNote.title = "";
    this.newNote.content = "";
    this.newNote.color = "#fffbea";
  },
    updateNote() {
      if (
        !this.updatingNote.title.trim() ||
        !this.updatingNote.content.trim()
      )
        return;
      axios
        .put(
          `http://localhost:8000/api/notes/${this.updatingNote.id}`,
          this.updatingNote
        )
        .then(() => {
          this.updatingNote = null;
          this.fetchNotes();
        })
        .catch(console.error);
    },
    cancelUpdate() {
      this.updatingNote = null;
    },
  },
  mounted() {
    this.fetchNotes();
  },
};
</script>

<style scoped>
.note-card {
  transition: box-shadow 0.2s;
}
.note-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
