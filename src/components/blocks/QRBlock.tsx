/**
 * QRBlock - QR code display block
 */

import { useEffect, useRef } from 'react';
import type { QRBlockProps } from '../../types/directus';

interface Props {
    props: QRBlockProps;
}

export function QRBlock({ props }: Props) {
    const { value, size = 200, title, description } = props;
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        // Simple QR code generation using canvas
        // In production, use a library like 'qrcode' npm package
        generateQR(canvasRef.current, value, size);
    }, [value, size]);

    return (
        <div className="my-8 text-center">
            {title && (
                <h3 className="text-xl font-semibold text-uan-primary mb-2">{title}</h3>
            )}
            {description && (
                <p className="text-uan-muted mb-4">{description}</p>
            )}
            <div className="inline-block bg-white p-4 rounded-lg shadow-md">
                <canvas
                    ref={canvasRef}
                    width={size}
                    height={size}
                    className="mx-auto"
                />
                <p className="text-xs text-uan-muted mt-2 break-all max-w-xs">
                    {value}
                </p>
            </div>
        </div>
    );
}

// Placeholder QR generation - replace with actual library
function generateQR(canvas: HTMLCanvasElement | null, value: string, size: number) {
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, size, size);

    // Draw placeholder pattern
    ctx.fillStyle = '#1A1A1A';
    const cellSize = size / 25;

    // Corner squares
    drawCorner(ctx, 0, 0, cellSize);
    drawCorner(ctx, size - 7 * cellSize, 0, cellSize);
    drawCorner(ctx, 0, size - 7 * cellSize, cellSize);

    // Generate simple pattern from value hash
    const hash = simpleHash(value);
    for (let i = 8; i < 17; i++) {
        for (let j = 8; j < 17; j++) {
            if ((hash >> ((i * 17 + j) % 32)) & 1) {
                ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
            }
        }
    }
}

function drawCorner(ctx: CanvasRenderingContext2D, x: number, y: number, cellSize: number) {
    // Outer square
    ctx.fillRect(x, y, 7 * cellSize, 7 * cellSize);
    // Inner white
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(x + cellSize, y + cellSize, 5 * cellSize, 5 * cellSize);
    // Center square
    ctx.fillStyle = '#1A1A1A';
    ctx.fillRect(x + 2 * cellSize, y + 2 * cellSize, 3 * cellSize, 3 * cellSize);
}

function simpleHash(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash = hash & hash;
    }
    return Math.abs(hash);
}

export default QRBlock;
