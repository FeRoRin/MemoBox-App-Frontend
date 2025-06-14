<template>
  <div class="card note-card border-0 shadow-sm position-relative">
    <!-- Delete X button in top right corner -->
    <button
      type="button"
      class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 m-2 p-0 delete-btn"
      style="width: 24px; height: 24px; line-height: 0.8; font-weight: bold;"
      @click="$emit('delete-note', note.id)"
      aria-label="Delete note"
    >
      &times;
    </button>

    <div class="card-body">
      <h5 class="card-title">{{ note.title }}</h5>
      <p class="card-text text-muted">{{ note.content }}</p>
    </div>

    <!-- Update button bottom right -->
    <button
      type="button"
      class="btn btn-sm btn-outline-info position-absolute bottom-0 end-0 m-2 p-1 update-btn"
      style="width: 28px; height: 28px; line-height: 1;"
      @click="$emit('update-note', note)"
      aria-label="Update note"
      title="Edit note"
    >
      ✎
    </button>
  </div>
</template>

<script>
export default {
  name: "NoteCard",
  props: {
    note: Object,
  },
};
</script>

<style scoped>
.note-card {
  transition: box-shadow 0.2s;
  min-height: 150px; /* enough height for buttons */
}
.note-card:hover {
transform: scale(1.03);
}

.delete-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  width: 24px;
  height: 24px;
  border: none;
  background: white;
  font-weight: bold;
  font-size: 20px;
  line-height: 1;
  color: #dc3545; /* Bootstrap danger red */
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
  z-index: 10;
}

.delete-btn:hover {
  opacity: 1;
}

.update-btn {
  border: none;
  background: white;
  font-weight: bold;
  font-size: 18px;
  color: #25fd0d; /* Bootstrap primary blue */
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s;
  z-index: 10;
}

.update-btn:hover {
  opacity: 1;
}

.note-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
</style>
