<template>
    <div class="App">
      <div style="padding: 20px">
        <h1>Expense List</h1>
        <button @click="modalOpen = true">Add Expense</button>
        <table border="1" style="width: 100%; text-align: left">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Date</th>
              <th>Payment Type</th>
              <th>Reference Image</th>
              <th>Expense Note</th>
              <th>Location</th>
              <th>Item Name</th>
              <th>Payment For</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="expense in expenses" :key="expense.id">
              <td>{{ expense.id }}</td>
              <td>{{ expense.first_name }}</td>
              <td>{{ expense.last_name }}</td>
              <td>{{ expense.date }}</td>
              <td>{{ expense.payment_type }}</td>
              <td>
                <img :src="`http://localhost:8000/storage/${expense.reference_image}`" alt="Reference" style="width: 100px" />
              </td>
              <td>{{ expense.expense_note }}</td>
              <td>{{ expense.location }}</td>
              <td>{{ expense.item_name }}</td>
              <td>{{ expense.payment_for }}</td>
              <td>{{ expense.payment_status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Modal -->
      <div v-if="modalOpen" class="modal">
        <div class="modal-content">
          <h5>Add New Expense</h5>
          <form @submit.prevent="handleFormSubmit">
            <div>
              <label>First Name:</label>
              <input type="text" v-model="formData.first_name" />
            </div>
            <div>
              <label>Last Name:</label>
              <input type="text" v-model="formData.last_name" />
            </div>
            <div>
              <label>Date:</label>
              <input type="date" v-model="formData.date" />
            </div>
            <div>
              <label>Payment Type:</label>
              <select v-model="formData.payment_type">
                <option value="cash">Cash</option>
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
                <option value="online">Online</option>
              </select>
            </div>
            <div>
              <label>Reference Image:</label>
              <input type="file" @change="handleFileChange" />
            </div>
            <div>
              <label>Expense Note:</label>
              <input type="text" v-model="formData.expense_note" />
            </div>
            <div>
              <label>Location:</label>
              <input type="text" v-model="formData.location" />
            </div>
            <div>
              <label>Item Name:</label>
              <input type="text" v-model="formData.item_name" />
            </div>
            <div>
              <label>Payment For:</label>
              <input type="text" v-model="formData.payment_for" />
            </div>
            <div>
              <label>Payment Status:</label>
              <input type="text" v-model="formData.payment_status" />
            </div>
            <button type="submit">Submit</button>
            <button type="button" @click="modalOpen = false">Close</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  export default {
    setup() {
      const expenses = ref([]);
      const modalOpen = ref(false);
      const formData = ref({
        first_name: "",
        last_name: "",
        date: "",
        payment_type: "cash",
        reference_image: null,
        expense_note: "",
        location: "",
        item_name: "",
        payment_for: "",
        payment_status: "",
      });
  
      const fetchExpenses = async () => {
        try {
          const response = await axios.get("http://localhost:8000/api/admin/expense/show");
          expenses.value = response.data.Expense;
        } catch (error) {
          console.error("Error fetching expenses:", error);
        }
      };
  
      const handleFileChange = (e) => {
        formData.value.reference_image = e.target.files[0];
      };
  
      const handleFormSubmit = async () => {
        const data = new FormData();
        Object.keys(formData.value).forEach((key) => {
          data.append(key, formData.value[key]);
        });
  
        try {
          await axios.post("http://localhost:8000/api/admin/addexpense", data, {
            headers: {
              "Content-Type": "multipart/form-data",
              "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content,
            },
          });
          modalOpen.value = false;
          formData.value = {
            first_name: "",
            last_name: "",
            date: "",
            payment_type: "cash",
            reference_image: null,
            expense_note: "",
            location: "",
            item_name: "",
            payment_for: "",
            payment_status: "",
          };
          fetchExpenses();
        } catch (error) {
          console.error("Error adding expense:", error);
        }
      };
  
      onMounted(() => {
        fetchExpenses();
      });
  
      return {
        expenses,
        modalOpen,
        formData,
        fetchExpenses,
        handleFileChange,
        handleFormSubmit,
      };
    },
  };
  </script>
  
  <style>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .modal-content {
    background: #fff;
    padding: 20px;
    border-radius: 5px;
    width: 500px;
  }
  </style>
  