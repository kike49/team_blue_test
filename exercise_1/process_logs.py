import csv
import json
import argparse
from collections import defaultdict
from pathlib import Path
from typing import Dict, List, Union

class LogProcessor:
    def __init__(self, log_file: str):
        self.log_file = log_file
        self.ip_stats = defaultdict(lambda: {'requests': 0, 'bytes': 0}) # avoid to initialize new keys and assign the default statistics values
        self.total_requests = 0
        self.total_bytes = 0

    def process_logs(self) -> None:
        """Process the log file and build statistics"""
        try:
            with open(self.log_file, 'r') as f:
                for line in f:
                    # returns true if the line is empty (just whitespaces) and skips it
                    if not line.strip():
                        continue
                    try:
                        _, bytes_sent, status, ip_addr = line.strip().split(';')
                        # exclude non-OK status
                        if status.upper() != 'OK':
                            continue
                        self.ip_stats[ip_addr]['requests'] += 1
                        self.ip_stats[ip_addr]['bytes'] += int(bytes_sent)
                        self.total_requests += 1
                        self.total_bytes += int(bytes_sent)
                    
                    except ValueError:
                        print(f"Warning: wrong formatted line skipped: {line.strip()}")
                        continue

        except FileNotFoundError:
            raise FileNotFoundError(f"Error: log file not found on the path: {self.log_file}")

    def generate_report_data(self) -> List[Dict[str, Union[str, int, float]]]:
        """Generate report data sorted by number of requests"""
        report_data = []
        for ip, stats in self.ip_stats.items():
            # adds the results dict to the report from the processed data
            report_data.append({
                'ip_address': ip,
                'requests': stats['requests'],
                'requests_percentage': round((stats['requests'] / self.total_requests * 100), 2) if self.total_requests else 0,
                'bytes_sent': stats['bytes'],
                'bytes_percentage': round((stats['bytes'] / self.total_bytes * 100), 2) if self.total_bytes else 0
            })
        
        # sort by requests number in descending order
        return sorted(report_data, key=lambda x: -x['requests'])

    def save_report(self, output_file: str, format: str = 'csv') -> None:
        """Redirects to save the report in the chosen format"""
        report_data = self.generate_report_data()
        output_path = output_file + '.' + format
        # create directory and file if doesnt exist
        Path(output_path).parent.mkdir(parents=True, exist_ok=True)
        
        if format.lower() == 'csv':
            self._save_csv(report_data, output_path)
        elif format.lower() == 'json':
            self._save_json(report_data, output_path)

    def _save_csv(self, data: List[Dict], output_path: str) -> None:
        """Protected method to save report in CSV format"""
        header_keys = ['ip_address', 'requests', 'requests_percentage', 'bytes_sent', 'bytes_percentage']
        with open(output_path, 'w', newline='') as f: # newline set to avoid extra blank spaces in Windows
            writer = csv.DictWriter(f, fieldnames=header_keys)
            writer.writeheader()
            writer.writerows(data)

    def _save_json(self, data: List[Dict], output_path: str) -> None:
        """Protected method to save report in JSON format"""
        with open(output_path, 'w') as f:
            json.dump(data, f, indent=2)


def main():
    parser = argparse.ArgumentParser(description='Process log files and generate IP address traffic report')
    parser.add_argument('--input', default='logfiles/requests.log', help='Input log file path')
    parser.add_argument('--output', default='reports/ipaddr', help='Output report file path')
    parser.add_argument('--format', choices=['csv', 'json'], default='csv', help='Output format (csv or json)')
    
    args = parser.parse_args()
    
    try:
        processor = LogProcessor(args.input)
        processor.process_logs()
        processor.save_report(args.output, args.format)
        print(f"Report successfully generated: {args.output}.{args.format}")
    except Exception as e:
        print(f"Error: {str(e)}")
        exit(1) # exits script with error code


# executes the main function if script called directly and not if imported as module
if __name__ == "__main__":
    main()
