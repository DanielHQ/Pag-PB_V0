const marcas = document.querySelectorAll('#marcas .marca');
const contenedorMarcas = document.querySelectorAll('.contenedorMarcas');
let marcaActiva = null;

marcas.forEach((marca) => {
	marca.addEventListener('click', (e) => {
		marcas.forEach((elemento) => {
			elemento.classList.remove('Activa');
		});

		e.currentTarget.classList.toggle('Activa');
		marcaActiva = marca.dataset.marca;


		// Activamos el contenedor de preguntas que corresponde
		contenedorMarcas.forEach((contenedor) => {
			if(contenedor.dataset.marca === marcaActiva){
				contenedor.classList.add('Activo');
			} else {
				contenedor.classList.remove('Activo');
			}
		});
	});
});
