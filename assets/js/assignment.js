// Fetch Chart Data and Render Chart
async function loadChart() {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
  
      // Prepare data for the chart
      const labels = data.products.slice(0, 5).map(product => product.title);
      const salesData = data.products.slice(0, 5).map(product => product.price);
  
      // Render the chart dynamically
      const ctx = document.getElementById('salesChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Sales',
              data: salesData,
              backgroundColor: '#27272a', // Gradient color
              borderRadius: 10, // Rounded bar edges
              borderWidth: 0, // No border for a cleaner look
            },
          ],
        },
        options: {
          scales: {
            x: {
              grid: {
                display: false, // Remove grid lines on x-axis
              },
              ticks: {
                display: false, // Hide x-axis labels
              },
              barPercentage: 0.5, // Reduce the width of the bars
              categoryPercentage: 0.7, // Adjust spacing between categories
            },
            y: {
              beginAtZero: true,
              grid: {
                display: true, // Show y-axis grid lines
                color: '#e5e7eb', // Light gray grid lines for a subtle look
              },
              ticks: {
                font: {
                  size: 12,
                  family: "'Arial', sans-serif", // Customize font
                  weight: 'bold',
                },
                color: '#4b5563', // Dark gray tick labels for contrast
              },
            },
          },
          plugins: {
            tooltip: {
              enabled: true, // Tooltips enabled for interactivity
              backgroundColor: '#111827', // Dark background for tooltips
              titleColor: '#ffffff', // White title text
              bodyColor: '#d1d5db', // Light gray body text
            },
            legend: {
              display: false, // No legend for simplicity
            },
          },
        },
      });
      
    } catch (error) {
      console.error('Error loading chart data:', error);
    }
  }
  
  // Fetch Users and Populate Table
  async function loadUsers() {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const users = await response.json();
  
      const tableBody = document.querySelector('#usersTable tbody');
      tableBody.innerHTML = ''; // Clear existing data
  
      users.forEach(user => {
        const row = `
          <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
          </tr>
        `;
        tableBody.innerHTML += row;
      });
    } catch (error) {
      console.error('Error loading users:', error);
    }
  }
  
  // Load data when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    loadChart();
    loadUsers();
  });
  