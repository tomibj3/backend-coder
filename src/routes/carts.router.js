import { Router } from "express";
const router = Router(); 

//Array

const carts = [];
let nextCartId = 1;


// Ruta para obtener todos los carritos

router.get('/', (req, res) => {
    res.json(carts);
});

// Ruta para obtener un carrito por su ID

router.get('/:cid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const cart = carts.find(c => c.id === cartId);
    if (cart) {
        res.json(cart);
    } else {
        res.status(404).send('Carrito no encontrado');
    }
});

// Ruta para crear un nuevo carrito

router.post('/', (req, res) => {
    const newCart = {
        id: nextCartId++,
        products: req.body.products || []
    };

    carts.push(newCart);
    res.send("Carrito creado correctamente");
});


// Ruta para agregar un producto al carrito por ID de carrito y producto

router.post('/:cid/product/:pid', (req, res) => {
    const cartId = parseInt(req.params.cid);
    const productId = parseInt(req.params.pid);
    const cart = carts.find(c => c.id === cartId);

    if (!cart) {
        return res.status(404).send('Carrito no encontrado');
    }

    const productInCart = cart.products.find(p => p.product === productId);

    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: productId, quantity: 1 });
    }

    res.json(cart);
});


export default router; 