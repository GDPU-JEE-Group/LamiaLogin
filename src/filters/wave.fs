const float PI = 3.14;

uniform sampler2D uSampler;
uniform vec4 filterArea;
uniform vec4 filterClamp;

uniform float amplitude;
uniform float band;
uniform float speed;
uniform float radius;
uniform float waves;
uniform vec3 status[COUNT];

varying vec2 vTextureCoord;

void main()
{
    vec2 uvOffset;
    vec2 rPosition;
    float rLength;
    float wavesFactor;
    float waveWidth;
    float currentRadius;
    float dampFactor;
    float cutFactor;
    float condition;

    for(int i = 0; i < COUNT; ++i)
    {
        if(status[i].z == -1.)
        {
            continue;
        }

        rPosition = vTextureCoord - status[i].xy / filterArea.xy;
        rPosition.x = rPosition.x * filterArea.x / filterArea.y;
        rLength = length(rPosition);

        wavesFactor = waves * rLength / radius;
        waveWidth = band * radius;

        condition = step(.5, status[i].z);
        dampFactor = condition + 1. - condition * status[i].z * 2.;

        currentRadius = radius * status[i].z;
        cutFactor = clamp(waveWidth * dampFactor - abs(currentRadius - rLength), 0., 1.);

        uvOffset += (rPosition / rLength) * cos((wavesFactor - status[i].z * speed) * PI) * amplitude * cutFactor;
    }

    gl_FragColor = texture2D(uSampler, fract(vTextureCoord + uvOffset));
}