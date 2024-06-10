import { Router } from "express";
const router = Router(); 


//Array de Productos

const products = []; 
let nextId = 1;


// Ruta para listar todos los productos

router.get('/', (req, res) => {
    const limit = req.query.limit ? parseInt(req.query.limit) : products.length;
    res.json(products.slice(0, limit));
});

// Ruta para obtener un producto por su ID

router.get('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Producto no encontrado');
    }
});


// Ruta para agregar un nuevo producto

router.post('/', (req, res) => {
    const { title, description, code, price, stock, category, thumbnails } = req.body;

    if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).send('Todos los campos son obligatorios');
    }

    const newProduct = {
        id: nextId++,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: thumbnails || []
    };

    products.push(newProduct);
    res.send("Producto creado correctamente");
});


// Ruta para actualizar un producto por su ID

router.put('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).send('Producto no encontrado');
    }

    const { id, ...updatedFields } = req.body;

    products[productIndex] = { ...products[productIndex], ...updatedFields };

    res.json(products[productIndex]);
});


// Ruta para eliminar un producto por su ID

router.delete('/:pid', (req, res) => {
    const productId = parseInt(req.params.pid);
    const productIndex = products.findIndex(p => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).send('Producto no encontrado');
    }

    products.splice(productIndex, 1);

    res.status(204).send();
});


export default router; 