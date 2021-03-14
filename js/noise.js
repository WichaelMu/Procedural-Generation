

/**
 * Perlin Noise functions for 2D.
 *
 * The 3D-Noise is a port of Ken Perlin's Java code. The
 * original Java code is at http://cs.nyu.edu/%7Eperlin/noise/.
 *
 * 1D, 2D and 4D versions are simple variations of Perlins concept 
**/

(function(){

    var permutation = [
        151,160,137,91,90,15,
        131,13,201,95,96,53,194,233,7,225,140,36,103,30,69,142,8,99,37,240,21,10,23,
        190, 6,148,247,120,234,75,0,26,197,62,94,252,219,203,117,35,11,32,57,177,33,
        88,237,149,56,87,174,20,125,136,171,168, 68,175,74,165,71,134,139,48,27,166,
        77,146,158,231,83,111,229,122,60,211,133,230,220,105,92,41,55,46,245,40,244,
        102,143,54, 65,25,63,161, 1,216,80,73,209,76,132,187,208, 89,18,169,200,196,
        135,130,116,188,159,86,164,100,109,198,173,186, 3,64,52,217,226,250,124,123,
        5,202,38,147,118,126,255,82,85,212,207,206,59,227,47,16,58,17,182,189,28,42,
        223,183,170,213,119,248,152, 2,44,154,163, 70,221,153,101,155,167, 43,172,9,
        129,22,39,253, 19,98,108,110,79,113,224,232,178,185, 112,104,218,246,97,228,
        251,34,242,193,238,210,144,12,191,179,162,241, 81,51,145,235,249,14,239,107,
        49,192,214, 31,181,199,106,157,184, 84,204,176,115,121,50,45,127, 4,150,254,
        138,236,205,93,222,114,67,29,24,72,243,141,128,195,78,66,215,61,156,180
    ];

    // build the perm array to avoid overflow
    var p = new Array(512);

    for (var i = 0; i < 256 ; i++) {
        p[256+i] = p[i] = permutation[i];
    }

	// fade: 6t^5-15t^4+10t^3
    function fade(t) {
        return t * t * t * (t * (t * 6 - 15) + 10);
    }

    // linear interpolation between a and b by amount t (0, 1)
    function lerp(t, a, b) {
        return a + t * (b - a);
    }

    function grad2D(hash, x, y) {
        /**
         * return ((hash & 1) == 0 ? x : -x) + ((hash & 2) == 0 ? y : -y);
         **/
        switch(hash & 3) {
            case 0: return  x + y;
            case 1: return -x + y;
            case 2: return  x - y;
            case 3: return -x - y;
            default: return 0; // never happens
        }
    }

    var PerlinNoise = function(x, y) {

        // find square that contains this point
        var X  = Math.floor(x) & 255,
            Y  = Math.floor(y) & 255;

        // find relative x, y, z of point in square
            x -= Math.floor(x);
            y -= Math.floor(y);

        // compute fade curves for x, y
        var u  = fade(x),
            v  = fade(y);

        // hash coordinates of the 4 square corners
        var aa = p[p[ X     ]+ Y        ],
            ab = p[p[ X     ]+ Y + 1    ],
            ba = p[p[ X + 1 ]+ Y        ],
            bb = p[p[ X + 1 ]+ Y + 1    ];

        // add blended results from 4 corners of square
        return lerp ( v, lerp( u, grad2D( aa, x    , y     ),
                                  grad2D( ba, x - 1, y     )),
                         lerp( u, grad2D( ab, x    , y - 1 ),
                                  grad2D( bb, x - 1, y - 1 )));

    }

    window.Noise = {
      PerlinNoise: PerlinNoise,
    };
})();
