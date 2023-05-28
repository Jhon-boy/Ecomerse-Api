/// <reference types="cypress" />

describe('Obtener todos los productos', () => {
  it('Verificar obtención de productos', () => {
    cy.intercept('GET', '**/products*', { fixture: 'products.json' }).as('getProducts');

    cy.visit('http://localhost:3000'); // Reemplaza la URL con la URL de tu aplicación

    // Simulamos la llamada a la función getAllProducts
    cy.window().then((win) => {
      win.getAllProducts(30); // Reemplaza el parámetro con el valor que desees
    });

    // Esperamos a que se complete la llamada a la API
    cy.wait('@getProducts').should(({ response }) => {
      expect(response.statusCode).to.eq(200);
      expect(response.body).to.have.length(30); // Reemplaza el valor con el número esperado de productos
    });

    // Verificamos que los productos se hayan mostrado en la interfaz de usuario
    cy.get('.product').should('have.length', 30); // Ajusta el selector según la estructura de tu interfaz

    // Verificamos que la carga se haya desactivado
    cy.get('.loader').should('not.exist'); // Ajusta el selector según la estructura de tu interfaz
  });
});