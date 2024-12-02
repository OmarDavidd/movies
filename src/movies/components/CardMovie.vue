<template>
	<div class="min-h-screen bg-[#2f3e46] py-8 px-4">
		<div class="max-w-7xl mx-auto">
			<h1 class="text-3xl font-extrabold text-[#cad2c5] mb-10 text-center">Películas Populares</h1>

			<div v-if="loading" class="flex justify-center items-center h-64">
				<div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
			</div>

			<div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 ">
				<div v-for="movie in movies.slice(inicio, fin)" :key="movie.id"
					class="bg-[#354f52] rounded-lg shadow-md overflow-hidden transition-transform duration-300 transform hover:scale-105">
					<img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" :alt="movie.title"
						class="w-full h-auto object-cover p-4">
					<div class="p-4">
						<hr>
						<h2
							class="text-2xl font-bold text-[#cad2c5] mb-3 transition-transform duration-300 transform hover:scale-105">
							{{ movie.title }}</h2>
						<hr>
						<div class="text-[#cad2c5] text-sm">
							<p class=" mb-2">{{ movie.overview }}</p>
							<p class=" italic font-bold">Fecha de lanzamiento:</p>
							<p class=" italic md-2">{{ movie.release_date }}</p>
							<p class=" italic font-bold">Actores principales:</p>
							<p class=" italic">{{ movie.autors }}</p>
						</div>

					</div>
				</div>
			</div>

			<div class="mt-8 flex justify-center space-x-4">
				<button
					class="bg-[#354f52] text-[#cad2c5] font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
					:class="{ 'opacity-50 cursor-not-allowed': inicio <= 0 }" @click="backPosts" :disabled="inicio <= 0">
					Anterior
				</button>
				<button
					class="bg-[#354f52] text-[#cad2c5] font-bold py-2 px-4 rounded-full transition duration-300 transform hover:scale-105"
					:class="{ 'opacity-50 cursor-not-allowed': fin >= movies.length }" @click="nextPosts"
					:disabled="fin >= movies.length">
					Siguiente
				</button>
			</div>
		</div>
	</div>
</template>

<script setup>
import { ref } from 'vue';



const movies = ref([]);
const loading = ref(true);

const options = {
	method: 'GET',
	headers: {
		accept: 'application/json',
		Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYjZmZjY0NTcyYTEwZTFkOWI2N2M4MjUzY2Y4YjRhNSIsIm5iZiI6MTczMDU3MDE2Ni4yMDg2NzU0LCJzdWIiOiI2NzI1MmVjYmNiNTQ4YjcxNmE4MjU2ZTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.Ws7qIxurnLpvxuhWCOyeJDXiLRCkHMXaoPAj_AqggOk'
	}
};

const getMovies = async () => {
	loading.value = true;
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/popular?language=es-MX&page=1`, options);
		const data = await response.json();

		movies.value = data.results.map(movie => ({
			...movie,
			autors: null
		}));

		for (const movie of movies.value) {
			movie.autors = await getAutors(movie.id);
		}
	} catch (err) {
		console.log(err);
	} finally {
		loading.value = false;
	}
};

const getAutors = async (id) => {
	try {
		const response = await fetch(`https://api.themoviedb.org/3/movie/${id}/credits?language=es-MX`, options);
		const data = await response.json();
		return data.cast.slice(0, 5).map(actor => actor.name).join(', ');
	} catch (err) {
		console.log(err);
		return 'No disponible';
	}
};

const valor = 4;
const inicio = ref(0);
const fin = ref(4);

const nextPosts = () => {
	inicio.value += valor;
	fin.value += valor;
};

const backPosts = () => {
	inicio.value -= valor;
	fin.value -= valor;
};

getMovies();
</script>
