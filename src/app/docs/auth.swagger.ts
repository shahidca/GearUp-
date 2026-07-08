/**
 * @openapi
 * tags:
 *   - name: Authentication
 *     description: Authentication APIs
 */

/**
 * @openapi
 * /auth/register:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Register a new user
 *     description: Register a new CUSTOMER or PROVIDER account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - role
 *             properties:
 *               name:
 *                 type: string
 *                 example: Shahid Hossain
 *               email:
 *                 type: string
 *                 example: shahid@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *               phone:
 *                 type: string
 *                 example: "01712345678"
 *               address:
 *                 type: string
 *                 example: Khulna, Bangladesh
 *               role:
 *                 type: string
 *                 enum:
 *                   - CUSTOMER
 *                   - PROVIDER
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Validation error
 */

/**
 * @openapi
 * /auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Login user
 *     description: Login with email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: shahid@gmail.com
 *               password:
 *                 type: string
 *                 example: Password123
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid credentials
 */

/**
 * @openapi
 * /auth/me:
 *   get:
 *     tags:
 *       - Authentication
 *     summary: Get current user profile
 *     description: Returns the logged-in user's profile.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *       401:
 *         description: Unauthorized
 */

export {};