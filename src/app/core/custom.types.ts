/**
* This program ("Fusion.php") enables SQL commands to query the Fusion tables originally created from Dr Parkhomov's spreadsheets.
*
* To make full use of this and the other database tables, a good grasp of SQL is essential.
*
* But note that it, TwoToTwo and Fission is each dedicated to querying only one of two tables.
*
* The "universal" program All Tables can accept full SQL commands that query
* any of the 12 "Parkhomov" tables, together with the "ElementProperties",
* "Nuclides", "RadioNuclides" and "Atomic Radii" tables as well.
 */



/**
* You may indicate which of the three neutrino conditions to include: "left" and/or "none" and/or "right".
 The default condition is include all three.
*/
export type NeutrinoContributions =  'l' | 'r' | 'n';

/**
 * All the particles we observe in nature comes in two types as bosons and fermions.
 *  We can divide the particles into these two groups based on the spin of the particles.
 *  Therefore, we call it “spin classification”. All particles have a spin or “intrinsic angular momentum”.
 * 
 * https://www.differencebetween.com/difference-between-bosons-and-fermions/
 */
export type SpinClassification = 'b' | 'f' | undefined; // We can select bosons, fermions, or either.
export type SpinBody = 'nucleus' | 'nuclide'; // Nucleus or nuclide
export type SpinChoice = 'x';