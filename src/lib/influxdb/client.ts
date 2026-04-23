import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { SironaPayload } from '../../types/telemetry';

const url = process.env.INFLUXDB_URL || '';
const token = process.env.INFLUXDB_TOKEN || '';
const org = process.env.INFLUXDB_ORG || '';
const bucket = process.env.INFLUXDB_BUCKET || '';

class SironaInfluxClient {
  private writeApi: WriteApi;

  constructor() {
    const client = new InfluxDB({ url, token });
    // Batching nastaven na 1s nebo 1000 bodů pro optimalizaci I/O na disku D:
    this.writeApi = client.getWriteApi(org, bucket, 'ms');
  }

  public async writeTelemetry(payload: SironaPayload): Promise<void> {
    const { tenantId, nodeId, metrics } = payload;

    if (metrics.ph) {
      const phPoint = new Point('water_quality')
        .tag('tenant_id', tenantId)
        .tag('node_id', nodeId)
        .tag('sensor_type', 'ph')
        .floatField('value', metrics.ph.value)
        .timestamp(metrics.ph.timestamp);
      this.writeApi.writePoint(phPoint);
    }

    if (metrics.ec) {
      const ecPoint = new Point('water_quality')
        .tag('tenant_id', tenantId)
        .tag('node_id', nodeId)
        .tag('sensor_type', 'ec')
        .floatField('value', metrics.ec.value)
        .floatField('tds', metrics.ec.tds)
        .timestamp(metrics.ec.timestamp);
      this.writeApi.writePoint(ecPoint);
    }

    // Flush do DB probíhá automaticky na pozadí (non-blocking)
    console.log(`[INFLUX_PUSH]: Data buffered for Node ${nodeId}`);
  }

  public async close(): Promise<void> {
    await this.writeApi.close();
  }
}

export const sironaInflux = new SironaInfluxClient();