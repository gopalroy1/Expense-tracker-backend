import { Router, Request, Response } from 'express';
import os from 'os';

const healthRouter = Router();

healthRouter.get('/', (_req: Request, res: Response) => {
  const mem = process.memoryUsage();
  const totalMem = os.totalmem();
  const freeMem = os.freemem();

  res.json({
    status: 'ok',
    ts: Date.now(),
    uptime_s: Math.floor(process.uptime()),
    cpu: {
      load_avg: os.loadavg(),          // [1m, 5m, 15m]
      cores: os.cpus().length,
    },
    memory: {
      heap_used_mb:  +(mem.heapUsed  / 1024 / 1024).toFixed(2),
      heap_total_mb: +(mem.heapTotal / 1024 / 1024).toFixed(2),
      rss_mb:        +(mem.rss       / 1024 / 1024).toFixed(2),
      system_free_mb:  +(freeMem  / 1024 / 1024).toFixed(2),
      system_total_mb: +(totalMem / 1024 / 1024).toFixed(2),
    },
  });
});

export default healthRouter;
