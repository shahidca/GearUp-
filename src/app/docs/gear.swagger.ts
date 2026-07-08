/**
 * @openapi
 * tags:
 *   - name: Gear
 *     description: Gear Management APIs
 */

/**
 * @openapi
 * /gear:
 *   get:
 *     summary: Get all gear
 *     description: Retrieve all available gear items.
 *     tags:
 *       - Gear
 *     responses:
 *       200:
 *         description: Gear retrieved successfully
 */

/**
 * @openapi
 * /gear/{id}:
 *   get:
 *     summary: Get gear by ID
 *     description: Retrieve a single gear item by its ID.
 *     tags:
 *       - Gear
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 3f24db0b-fb9b-45a4-94b6-24f8d8d6d5d8
 *     responses:
 *       200:
 *         description: Gear retrieved successfully
 *       404:
 *         description: Gear not found
 */

/**
 * @openapi
 * /gear:
 *   post:
 *     summary: Create new gear
 *     description: Provider creates a new gear listing.
 *     tags:
 *       - Gear
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - pricePerDay
 *               - stock
 *               - availableStock
 *               - condition
 *               - images
 *               - providerId
 *               - categoryId
 *             properties:
 *               name:
 *                 type: string
 *                 example: Mountain Bike
 *               slug:
 *                 type: string
 *                 example: mountain-bike
 *               description:
 *                 type: string
 *                 example: Premium mountain bike for outdoor adventures.
 *               brand:
 *                 type: string
 *                 example: Giant
 *               model:
 *                 type: string
 *                 example: ATX 860
 *               pricePerDay:
 *                 type: number
 *                 example: 500
 *               stock:
 *                 type: integer
 *                 example: 10
 *               availableStock:
 *                 type: integer
 *                 example: 10
 *               condition:
 *                 type: string
 *                 example: EXCELLENT
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example:
 *                   - https://example.com/image1.jpg
 *                   - https://example.com/image2.jpg
 *               specifications:
 *                 type: object
 *               providerId:
 *                 type: string
 *               categoryId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Gear created successfully
 *       400:
 *         description: Validation failed
 *       401:
 *         description: Unauthorized
 */

/**
 * @openapi
 * /gear/{id}:
 *   put:
 *     summary: Update gear
 *     description: Provider updates an existing gear item.
 *     tags:
 *       - Gear
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Gear updated successfully
 *       404:
 *         description: Gear not found
 */

/**
 * @openapi
 * /gear/{id}:
 *   delete:
 *     summary: Delete gear
 *     description: Provider deletes a gear item.
 *     tags:
 *       - Gear
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Gear deleted successfully
 *       404:
 *         description: Gear not found
 */

export {};