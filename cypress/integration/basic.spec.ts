describe('Basic Test', () => {
    it('Test', () => {
        cy.visit('/');
        cy.url().should('include', '/');
    });
});
