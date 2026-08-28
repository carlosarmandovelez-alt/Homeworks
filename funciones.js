// ============================================
// 📚 FUNCIONES PAR/IMPAR
// Homework - Regular vs Arrow Functions
// ============================================

// 1. REGULAR FUNCTION
function esParRegular(numero) {
    if (numero % 2 === 0) {
        console.log(`${numero} es PAR`);
    } else {
        console.log(`${numero} es IMPAR`);
    }
}

// 2. ARROW FUNCTION
const esParArrow = (numero) => {
    if (numero % 2 === 0) {
        console.log(`${numero} es PAR`);
    } else {
        console.log(`${numero} es IMPAR`);
    }
};

// ============================================
// PRUEBAS
// ============================================

console.log('--- Regular Function ---');
esParRegular(4);  // 4 es PAR
esParRegular(7);  // 7 es IMPAR
esParRegular(0);  // 0 es PAR

console.log('\n--- Arrow Function ---');
esParArrow(4);    // 4 es PAR
esParArrow(7);    // 7 es IMPAR
esParArrow(0);    // 0 es PAR
