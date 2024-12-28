import unittest
import tempfile
import os
from process_logs import LogProcessor

class TestLogProcessor(unittest.TestCase):
    def setUp(self):
        # temp log file for testing
        self.temp_dir = tempfile.mkdtemp()
        self.log_file = os.path.join(self.temp_dir, 'test.log')
        self.sample_data = '''2024-03-14T12:00:01;1024;OK;192.168.1.1
                            2024-03-14T12:00:02;2048;OK;192.168.1.1
                            2024-03-14T12:00:03;1024;OK;192.168.1.2
                            2024-03-14T12:00:04;512;ERROR;192.168.1.3
                            2024-03-14T12:00:05;1024;OK;192.168.1.2'''
        with open(self.log_file, 'w') as f:
            f.write(self.sample_data)

    def tearDown(self):
        # clean up temp files after tests
        os.remove(self.log_file)
        os.rmdir(self.temp_dir)

    def test_process_logs(self):
        processor = LogProcessor(self.log_file)
        processor.process_logs()
        
        # total request (5 lines, 1 with error)
        self.assertEqual(processor.total_requests, 4)
        
        # ip requests number
        self.assertEqual(processor.ip_stats['192.168.1.1']['requests'], 2)
        self.assertEqual(processor.ip_stats['192.168.1.2']['requests'], 2)
        
        # error ip key is skipped so not on the report
        self.assertNotIn('192.168.1.3', processor.ip_stats)

        # total bytes
        self.assertEqual(processor.ip_stats['192.168.1.1']['bytes'], 3072)
        self.assertEqual(processor.ip_stats['192.168.1.2']['bytes'], 2048)

    def test_save_csv(self):
        # create temp output file
        output_file = os.path.join(self.temp_dir, 'report')
        processor = LogProcessor(self.log_file)
        processor.process_logs()
        processor.save_report(output_file, 'csv')
        # assert the file is saved
        file_format_path = output_file + '.csv'
        self.assertTrue(os.path.exists(file_format_path))
        # remove temp file
        os.remove(file_format_path)

    def test_save_json(self):
        # create temp output file
        output_file = os.path.join(self.temp_dir, 'ipaddr_temp')
        processor = LogProcessor(self.log_file)
        processor.process_logs()
        processor.save_report(output_file, 'json')
        # assert the file is saved
        file_format_path = output_file + '.json'
        self.assertTrue(os.path.exists(file_format_path))
        # remove temp file
        os.remove(file_format_path)


# to run the test directly executing the script
if __name__ == '__main__':
    import unittest
    unittest.main(verbosity=2)
    