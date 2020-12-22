from django.db import models

# Create your models here.

class PoliticianManager(models.Manager):
    def delete_everything(self):
        Politician.objects.all().delete()

    def drop_table(self):
        from django.db import connection
        with connection.cursor() as cursor:
            cursor = connection.cursor()
            table_name = self.model._meta.db_table
            sql = "DROP TABLE %s;" % (table_name, )
            cursor.execute(sql)


class OrganizationManager(models.Manager):
    def delete_everything(self):
        Organization.objects.all().delete()

    def drop_table(self):
        from django.db import connection
        with connection.cursor() as cursor:
            cursor = connection.cursor()
            table_name = self.model._meta.db_table
            sql = "DROP TABLE %s;" % (table_name, )
            cursor.execute(sql)


class Politician(models.Model):
    name = models.CharField(max_length=200, default="Politician_Name")
    party = models.CharField(max_length=5, default="none", null=True)
    candidate_id = models.TextField(null=True)
    state = models.TextField(null=True)
    objects = PoliticianManager()

    def delete_everything(self):
        Politician.objects.all().delete()

    def __str__(self):
        return self.name

class Organization(models.Model):
    name = models.CharField(max_length=200, default="Organization_Name")

    def __str__(self):
        return self.name





    # def with_counts(self):
    #     from django.db import connection
    #     with connection.cursor() as cursor:
    #         cursor.execute("""
    #             SELECT p.id, p.question, p.poll_date, COUNT(*)
    #             FROM polls_opinionpoll p, polls_response r
    #             WHERE p.id = r.poll_id
    #             GROUP BY p.id, p.question, p.poll_date
    #             ORDER BY p.poll_date DESC""")
    #         result_list = []
    #         for row in cursor.fetchall():
    #             p = self.model(id=row[0], question=row[1], poll_date=row[2])
    #             p.num_responses = row[3]
    #             result_list.append(p)
    #     return result_list