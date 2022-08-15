# teste_keeggo

/* login
 *
 * Como um usuário da world-wide web
 * Quero realizar a compra de peças do vestuario feminino
 * 
 */
 
Scennario: Realizar login
Given que acesso o site http://automationpractice.com/
When os campos para login são exibidos
And preencho o campo Email address com teste2021@teste.com.br
And preencho o campo Password com a senha teste
Then será exibido os campos de login

/* busca
 *
 * Como usuario realizo a busca da peça de vestuario feminino.
 *
 */

Scennario: Realizar uma busca
Given que estou na tela principal 
When informo o produto desejado no campo Search 
And preencho o campo com o valor Faded Short Sleeve T-shirts
Then será exibido uma lista de produtos

/* seleciona o produto
 *
 * Como usuario seleciono a peça do vestuario feminino desejada.
 *
 */

Scennario: Selecionar peça desejada
Given que estou na tela de Busca
And o resultado da busca é apresentado
And aciono o botão More
Then sou direcionado para tela de confirmação do produto.

/* adicionar no carrinho
 *
 * Como usuario adiciono ao carrinho o produto desejado.
 *
 */

Scennario: Confirmar escolha do produto
Given que estou na tela de especificação do produro 
When aciono o botão Add to card 
And abre uma popup com o produto em destaque
And aciono o botão Add to card 
And aciono o botão Proceed to checkout
Then sou direcionado para tela de confirmação do endereço de entrega.

/* confirma local de entrega
 *
 * Como usuario realizo a busca da peça de vestuario feminino.
 *
 */

Scennario: Informar local de entrega
Given que estou na tela de endereço
When aciono o checkbox comfirmando o endereço de recebimento 
And aciono o botão Proceed to checkout
Then sou direcionada para tela de confirmação do endereço 


/* confirma forma de pagamento
 *
 * Como usuario realizo a busca da peça de vestuario feminino.
 *
 */

Scennario: Confirmar forma de pagamento
Given que estou na tela Your payment method
When aciono a opção Bank-wire payment.
And aciono o botão I confirm my order
Then realizo a compra do produto desejado.