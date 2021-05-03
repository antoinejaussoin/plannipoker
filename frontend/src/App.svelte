<script lang='typescript'>
	import {onMount} from 'svelte';
	import './App.css';
	let count: number = 0;
	onMount(() => {
	  const interval = setInterval(() => count++, 1000);
	  return () => {
		clearInterval(interval);
	  };
	});
  </script>
  
  <style>
	  
	:global(body) {
	  margin: 0;
	  font-family: Arial, Helvetica, sans-serif;
	}
	.App {
	  text-align: center;
	}
	.App code {
	  background: #0002;
	  padding: 4px 8px;
	  border-radius: 4px;
	}
	.App p {
	  margin: 0.4rem;
	}
  
	.App-header {
	  background-color: #f9f6f6;
	  color: #333;
	  min-height: 100vh;
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	  font-size: calc(10px + 2vmin);
	}
	.App-link {
	  color: #ff3e00;
	}
	.App-logo {
	  height: 36vmin;
	  pointer-events: none;
	  margin-bottom: 3rem;
	  animation: App-logo-spin infinite 1.6s ease-in-out alternate;
	}
	@keyframes App-logo-spin {
	  from {
		transform: scale(1);
	  }
	  to {
		transform: scale(1.06);
	  }
	}
  </style>
  
  <div class="App">
	<header class="App-header">
	  <img src="/logo.svg" class="App-logo" alt="logo" />
	  <p>Edit <code>src/App.svelte</code> and save to reload.</p>
	  <p>Page has been open for <code>{count}</code> seconds.</p>
	  <p>
		<a class="App-link" href="https://svelte.dev" target="_blank" rel="noopener noreferrer">
		  Learn Svelte
		</a>
	  </p>
	</header>
	<figure class="md:flex bg-gray-100 rounded-xl p-8 md:p-0">
		<div class="pt-6 md:p-8 text-center md:text-left space-y-4">
		  <blockquote>
			<p class="text-lg font-semibold">
			  “Tailwind CSS is the only framework that I've seen scale
			  on large teams. It’s easy to customize, adapts to any design,
			  and the build size is tiny.”
			</p>
		  </blockquote>
		  <figcaption class="font-medium">
			<div class="text-red-500">
			  Sarah Dayan
			</div>
			<div class="text-gray-500">
			  Staff Engineer, Algolia
			</div>
		  </figcaption>
		</div>
	  </figure>
  </div>
  