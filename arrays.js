// 1. push() - Agrega al final
const arr = [1, 2];
arr.push(3);
console.log('push:', arr); // [1, 2, 3]

// 2. pop() - Elimina el último
arr.pop();
console.log('pop:', arr); // [1, 2]

// 3. unshift() - Agrega al principio
arr.unshift(0);
console.log('unshift:', arr); // [0, 1, 2]

// 4. shift() - Elimina el primero
arr.shift();
console.log('shift:', arr); // [1, 2]

// 5. splice() - Añade/Elimina en posición
const nums = [1, 2, 3, 4];
nums.splice(1, 2, 'x');
console.log('splice:', nums); // [1, 'x', 4]

// 6. reverse() - Invierte orden
const letras = ['a', 'b', 'c'];
letras.reverse();
console.log('reverse:', letras); // ['c', 'b', 'a']

// 7. sort() - Ordena elementos
const desordenado = [5, 2, 9, 1];
desordenado.sort((a, b) => a - b);
console.log('sort:', desordenado); // [1, 2, 5, 9]

// 8. fill() - Rellena con valor
const vacio = new Array(3);
vacio.fill(0);
console.log('fill:', vacio); // [0, 0, 0]

// 9. copyWithin() - Copia internamente
const orig = ['a', 'b', 'c', 'd'];
orig.copyWithin(0, 2, 4);
console.log('copyWithin:', orig); // ['c', 'd', 'c', 'd']


// 10. concat() - Une arrays
console.log('concat:', [1, 2].concat([3, 4])); // [1, 2, 3, 4]

// 11. slice() - Extrae parte
console.log('slice:', [1, 2, 3, 4].slice(1, 3)); // [2, 3]

// 12. indexOf() - Busca primera ocurrencia
console.log('indexOf:', [2, 4, 6, 4].indexOf(4)); // 1

// 13. lastIndexOf() - Busca última ocurrencia
console.log('lastIndexOf:', [2, 4, 6, 4].lastIndexOf(4)); // 3

// 14. includes() - Verifica existencia
console.log('includes:', [1, 2, 3].includes(2)); // true

// 15. join() - Convierte a string
console.log('join:', ['Hola', 'Mundo'].join(' ')); // "Hola Mundo"

// 16. toString() - Convierte a string
console.log('toString:', [1, 2, 3].toString()); // "1,2,3"

// 17. toLocaleString() - String localizado
console.log('toLocaleString:', [1000, 2000].toLocaleString('es-ES')); // "1.000, 2.000"

// 18. forEach() - Recorre
[1, 2].forEach(x => console.log('forEach:', x));

// 19. map() - Transforma
console.log('map:', [1, 2, 3].map(x => x * 2)); // [2, 4, 6]

// 20. filter() - Filtra
console.log('filter:', [1, 2, 3, 4].filter(x => x % 2 === 0)); // [2, 4]

// 21. reduce() - Reduce a un valor
console.log('reduce:', [1, 2, 3, 4].reduce((a, b) => a + b, 0)); // 10

// 22. reduceRight() - Reduce de derecha
console.log('reduceRight:', ['a', 'b'].reduceRight((a, b) => a + b)); // "ba"

// 23. some() - ¿Alguno cumple?
console.log('some:', [1, 2, 3].some(x => x > 2)); // true

// 24. every() - ¿Todos cumplen?
console.log('every:', [1, 2, 3].every(x => x > 0)); // true

// 25. find() - Encuentra primero
console.log('find:', [1, 2, 3, 4].find(x => x > 2)); // 3

// 26. findIndex() - Índice del primero
console.log('findIndex:', [1, 2, 3, 4].findIndex(x => x > 2)); // 2

// 27. findLast() - Encuentra último
console.log('findLast:', [1, 2, 3, 4].findLast(x => x > 2)); // 4

// 28. findLastIndex() - Índice del último
console.log('findLastIndex:', [1, 2, 3, 4].findLastIndex(x => x > 2)); // 3

// 29. flat() - Aplana
console.log('flat:', [1, [2, [3]]].flat(2)); // [1, 2, 3]

// 30. flatMap() - Mapea y aplana
console.log('flatMap:', [1, 2].flatMap(x => [x, x * 2])); // [1, 2, 2, 4]

// 31. keys() - Índices
console.log('keys:', [...['a', 'b'].keys()]); // [0, 1]

// 32. values() - Valores
console.log('values:', [...['a', 'b'].values()]); // ['a', 'b']

// 33. entries() - [índice, valor]
console.log('entries:', [...['a', 'b'].entries()]); // [[0, 'a'], [1, 'b']]

console.log('\n========== at() Y constructor ==========\n');

// 34. at() - Accede con índice negativo
console.log('at:', ['rojo', 'verde', 'azul'].at(-1)); // 'azul'

// 35. constructor - Función constructora
console.log('constructor:', [1, 2, 3].constructor === Array); // true
